import "../styles/global.css";

import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import {NextUIProvider} from "@nextui-org/react";
import Chatbot from "../components/chatbot2";
import Bot from "../components/buttonChatbot";
export const metadata = {
  title: "Faculty Flow",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>


    <body>
      <Provider>
      
        <div className='main'>
          <div className='gradient' />
        </div>
        <Bot />
        <main className='app'>
          <Navbar />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;