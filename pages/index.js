import Head from 'next/head';
import { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState('');

  const socket = useSocket('chat message', (message) => {
    console.log('received event');
    setMessages((messages) => [...messages, message]);
  });

  useSocket('user typing', (data) => {
    console.log(`${data} is typing`);
    setInfo(`${data} is typing`);
  });

  const onChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const onKeyDown = (e) => {
    socket.emit('typing');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('I am clicked', message, messages);
    setMessages((prev) => [...prev, message]);
    socket.emit('chat message', message);
    setMessage('');
  };

  const renderMessages = () =>
    messages.map((message, idx) => <li key={idx}>{message}</li>);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <span>{info}</span>
        <ul id="messages">{renderMessages()}</ul>
        <form id="form" action="">
          <input
            id="input"
            autoComplete="off"
            value={message}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <button onClick={onSubmit}>Send</button>
        </form>
      </main>

      <footer></footer>

      <style jsx>{`
        #form {
          background: rgba(0, 0, 0, 0.15);
          padding: 0.25rem;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          height: 3rem;
          box-sizing: border-box;
          backdrop-filter: blur(10px);
        }
        #input {
          border: none;
          padding: 0 1rem;
          flex-grow: 1;
          border-radius: 2rem;
          margin: 0.25rem;
        }
        #input:focus {
          outline: none;
        }
        #form > button {
          background: #333;
          border: none;
          padding: 0 1rem;
          margin: 0.25rem;
          border-radius: 3px;
          outline: none;
          color: #fff;
        }

        #messages {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        #messages > li {
          padding: 0.5rem 1rem;
        }
        #messages > li:nth-child(odd) {
          background: #efefef;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
