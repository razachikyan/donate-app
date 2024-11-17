import 'dotenv/config'

const env = {
  BASE_URL: process.env.REACT_APP_BACK_BASE || "http://localhost:5000",
};

export default env;
