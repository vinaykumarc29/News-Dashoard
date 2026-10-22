import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/fetch", async (req, res) => {
  try {
    const { search  } = req.query;

    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = 20;

    const endpoint = search
      ? "https://api.currentsapi.services/v1/search"
      : "https://api.currentsapi.services/v1/latest-news";

    const params = {
      page_number: page,
      page_size: pageSize,
    };

    if (search) {
      params.keywords = search;
    }

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.Api_key}`,
      },
      params,
    });

    return res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching news:",
      error.response?.data || error.message
    );

    return res.status(error.response?.status || 500).json({
      message: "Unable to fetch news. Please try again later.",
    });
  }
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
