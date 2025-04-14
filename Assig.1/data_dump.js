// Sample data for the blog application
const usersData = [
    {
        id: 1,
        username: "John Doe",
        email: "john.doe@bacancy.com",
        password: "John@123"
    }
  ];
  
  const blogsData = [
    {
        id: 1,
        title: "Getting Started with Web Development",
        image: "https://via.placeholder.com/600x400",
        content: "Web development is an exciting field that combines creativity with technical skills. In this post, we'll explore the basics of HTML, CSS, and JavaScript.",
        comments: [
            {
                username: "John Doe",
                content: "Great introduction to web development!"
            }
        ]
    },
    {
        id: 2,
        title: "Understanding CSS Flexbox",
        image: "https://via.placeholder.com/600x400",
        content: "Flexbox is a powerful layout model that makes it easy to design flexible responsive layouts. Let's dive into its core concepts.",
        comments: []
    }
  ];
  
  // Function to initialize localStorage with sample data
  if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(usersData));
      localStorage.setItem("blogs", JSON.stringify(blogsData));
    }
    