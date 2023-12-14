import uvicorn
from pydantic import BaseModel
from typing import Annotated
from fastapi import FastAPI, File, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
import whisper
from transformers import AutoTokenizer, AutoModelWithLMHead


class RequestBody(BaseModel):
    audio_file: Annotated[bytes, File()]


class ResponseBody(BaseModel):
    plain_text: str
    history: dict[str, list]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.on_event("startup")
def load_model():
    model_type = "large-v2"
    model = whisper.load_model(model_type)
    tokenizer = AutoTokenizer.from_pretrained('t5-base')
    transformer = AutoModelWithLMHead.from_pretrained('t5-base',
                                                      return_dict=True)
    print("Model loaded successfully!")
    app.state.model = {
        "model": model,
        "tokenizer": tokenizer,
        "transformer": transformer
    }


async def get_model(request: Request):
    return request.app.state.model


@app.post("/summarize")
async def summarize(file: Annotated[bytes, File()], model=Depends(get_model)):
    transcription = model["model"].transcribe(file)
    inputs = model["tokenizer"].encode("summarize: " + transcription["text"],
                                       return_tensors='pt',
                                       max_length=512,
                                       truncation=True)

    outputs = model["transformer"].generate(inputs, max_length=150,
                                            min_length=80,
                                            length_penalty=5.0,
                                            num_beams=2)

    summary = model["tokenizer"].decode(outputs[0])

    return {"summary": summary}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
