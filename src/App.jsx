import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  async function generateAnswer() {
    setAnswer('Answer is loading...')

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
      <div className='text-white bg-orange-500 w-full mx-4 my-10 text-center p-3 rounded-2xl sm:w-1/3 sm:mx-auto'>
        <p className='text-2xl'>I'm ATLAS AI</p>
        <p className='text-2xl'>Created by <span className='text-black text-3xl'>Akshay chaudhary</span></p>
      </div>

      <div className='w-full mx-4 h-20 p-3 text-center sm:w-1/4 sm:mx-auto'>
        <input
          className='w-full h-full rounded-xl bg-gray-500 text-white text-xl p-3'
          type="text"
          placeholder='Ask me anything'
          value={question}
          onChange={(e) => { setQuestion(e.target.value) }}

        />


      </div>

      <div className='bg-gray-500 w-40 h-10 m-4 rounded sm:m-auto hover:bg-gray-600'>
      <button
        onClick={generateAnswer}
        className='w-full h-full text-center rounded-xl text-xl mx-auto text-white'>
        Submit
      </button>
      </div>



      <p className='text-white my-10 mx-4 text-xl'>
        {answer}
      </p>
    </>
  )
}

export default App
