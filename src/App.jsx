import { useState } from 'react'
import './App.css'
import axios from 'axios'

// const api = import.meta.env.VITE_GEMINI_API_URL

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  async function generateAnswer() {
    setAnswer('Answer is loading...')
    // console.log(`This is api ${api}`);

    const response = await axios({
      method: 'post',
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAorAiCydTAHMFpZlQOiEI8C3hj0iS_DBs',
      data: {
        contents: [
          {
            parts: [
              { text: question }]
          }]
      }
    });

    console.log(response['data']['candidates'][0]['content']['parts'][0]['text']);

    setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    setQuestion('')

  }



  return (
    <>

      <div className='text-white bg-blue-700 h-auto p-3'>
        <p className='text-2xl'>Hello i'm Atlas AI</p>
        <p className='text-2xl'>Created by <span className='font-bold text-3xl'>Akshay chaudhary</span></p>

        <div className='text-xl mt-4'>
          I'm here to help you and i'll try to answer all of your questions.
        </div>
      </div>

      <div className='text-center'>
      <input
        className='w-11/12 h-auto mx-4 my-5 rounded-xl bg-gray-500 text-white text-xl ps-5 py-3 md:w-2/3 md:mx-auto'
        type="text"
        placeholder='Ask me anything'
        value={question}
        onChange={(e) => { setQuestion(e.target.value) }}

      />
      </div>



      <div className='bg-gray-500 w-28 h-10 mx-4 rounded-xl sm:m-auto hover:bg-gray-600'>
        <button
          onClick={generateAnswer}
          className='w-full h-full text-center text-xl text-white'>
          Submit
        </button>
      </div>



      <div className='text-white text-xl h-80 m-4 px-3 py-5 border border-gray-500 rounded overflow-auto md:w-2/3 md:mx-auto md:h-96'>
        <p className='w-full h-full'>
          {answer}
        </p>

      </div>
    </>
  )
}

export default App
