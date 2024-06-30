import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader} from '../components';


const CreatePost = () => {
const navigate = useNavigate(); //Allow us to navigate to the homepage once the post is created
const [form, setForm] = useState({
  name: '',
  prompt: '',
  photo: '',
});
const [generatingImg, setGeneratingImg] = useState(false); //to be used while we are making contact with the API and waiting to get the image
const [loading, setLoading] = useState(false); //for general loading

const generateImage = async () => {
  if(form.prompt) {
    try {
      setGeneratingImg(true);
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: form.prompt}),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();

      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`});
    } catch(error) {
      console.error('Error generating image:', error);
      alert(error);
    } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt')
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault(); //to ensure that browser doesnot reload the app
  if(form.prompt && form.photo) {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post' , {
        method : 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({...form})
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      await response.json();
      navigate('/');
    } catch(err) {
      console.error('Error submitting post:', err);
      alert(err);
    } finally {
      setLoading(false);
    }
  } else{
    alert('Please enter a prompt to generate an image :) !!');
  }
};

const handleChange =(e) => {
  setForm({...form, [e.target.name] : e.target.value })
}

const handleSurpriseMe = () => {
  const randomPrompt = getRandomPrompt(form.prompt);
  setForm({...form, prompt : randomPrompt });
};

return (
  <section className="max-w-7xl mx-auto">
    <style>{`
      @keyframes shadowPulse {
        0% {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        50% {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
        }
        100% {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
      }

      .shadow-pulse {
        animation: shadowPulse 1.5s infinite;
      }
    `}</style>
      <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create any image you can dream up!</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">Create imaginative and visually stunning images!</p>
        </div>

<form className="mt-10 max-w-3xl" onSubmit={handleSubmit}>
  <div className="flex flex-col gap-5">
    <FormField
    LabelName = "Your name"
    type = "text"
    name = "name"
    placeholder = "Write your name here"
    value = {form.name}
    handleChange = {handleChange}
    className="w-full"

    />
    <FormField
    LabelName = "Prompt"
    type = "text"
    name = "prompt"
    placeholder = "Describe the image you want to create or use surprise me button to auto-generate unique prompts for you"
    value = {form.prompt}
    handleChange = {handleChange}
    isSurpriseMe //to show additional button with this form field
    handleSurpriseMe = {handleSurpriseMe} //to handle this surprise button
    className="w-full"
    />
    {/* creating a place where an AI generated image will show or to show preview of the image */}
    <div className={`relative bg-gray-50 border border-gray-300 rounded-lg shadow-lg text-gray-800 text-sm w-96 h-96 flex justify-center items-center p-3 ${
              generatingImg ? 'shadow-pulse' : ''
            }`}
          >
        {form.photo ? (
          <img
          src={form.photo}
          alt={form.prompt}
          className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <img
          src={preview}
          alt="preview"
          className="w-9/12 h-9/12 object-contain opacity-40"
          />
        )}

        {generatingImg && (
          <div className="absolute inset-0 z-0 flex justify-center items-center bg-white bg-opacity-75 rounded-lg">
            <Loader />
            </div>
        )}
        </div>
  </div>

  <div className="mt-5 flex gap-5">
    <button
    type ="button"
    onClick = {generateImage}
    className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    >
      {generatingImg ? 'Generating...' : 'Generate'}
    </button>
  </div>
<div className="mt-10">
<p className="mt-2 text-[#666e75] text-[14px]">Created the image you wanted? Share it with others in the community to showcase your creativity!</p>

<button
type="submit"
className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
>
{loading ? 'Sharing...' : 'Share with the community'}
</button>
</div>
</form>
    </section>
  )
}

export default CreatePost