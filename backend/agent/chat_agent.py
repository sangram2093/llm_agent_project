from vertexai.language_models import ChatModel
from vertexai.preview.language_models import ChatSession

class GeminiAgent:
    def __init__(self):
        self.chat_model = ChatModel.from_pretrained("chat-bison")
        self.chat_session: ChatSession = self.chat_model.start_chat()

    def get_response(self, user_prompt: str) -> str:
        response = self.chat_session.send_message(user_prompt)
        return response.text
