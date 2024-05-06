import "../styles/global.css";

import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import Bot from "@/components/buttonChatbot"
import {NextUIProvider} from "@nextui-org/react";
import {Suspense} from "react";
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
          <Bot/>
        <main className='app'>
          <Suspense>
          <Navbar />
          {children}
            </Suspense>
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
