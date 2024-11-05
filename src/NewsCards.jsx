import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardMedia, Grid, Box } from "@mui/material";
import localArticles from "./Articles";

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const colors = ["#FFC1E3", "#FFECB3", "#C8E6C9", "#B3E5FC", "#D1C4E9", "#FFCDD2", "#FFF9C4", "#DCEDC8"];
  const commonImageUrl = "https://www.apple.com/in/iphone/home/images/overview/consider/apple_intelligence__gbh77cvflkia_xlarge.jpg";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=Apple&from=2024-11-05&sortBy=popularity&apiKey=e909ee26a1634f6683206457c3c345cc`
        );
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles.slice(0, 8)); // Display only the first 8 articles
        } else {
          setArticles(localArticles); // Fallback to local articles if API fails or is empty
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles(localArticles); // Fallback to local articles in case of error
      }
    };

    fetchArticles();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        News Letters
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ backgroundColor: colors[index % colors.length] }}>
              <CardMedia
                component="img"
                height="140"
                image={commonImageUrl}
                alt="News Image"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{article.title}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {article.author || "Unknown"} - {new Date(article.publishedAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">{article.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsComponent;
