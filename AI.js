import axios from 'axios';

export const checkImage = async (image) => {
  try {
    const response = await axios.get('https://api.sightengine.com/1.0/check.json', {
      params: {
        'url': image,
        'models': 'nudity-2.1,alcohol,offensive,gore-2.0,self-harm',
        'api_user': '998792024',
        'api_secret': '7iJ9KyVy9DTtYJmwedm5hxTFencBiqSw',
      }
    });
    return response.data; // returning the response data from the function
  } catch (error) {
    // handle error
    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return null; // return null in case of an error
  }
};

export default { checkImage };
