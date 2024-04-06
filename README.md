## Beta Theta Pies

https://a3-luke-foley.onrender.com/

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- The goal of the application is to create a website for Beta Theta Pi to run their yearly Beta Theta Pies philanthopy event, where the orders are collected on a MongoDB server.
- I ran into challenges learning MongoDB, as I am familiar with Postgres and MySQL, but not MongoGB. I also ran into challenges trying to get the OAuth to work, so I eventually had to abondon this.
- I chose to have my application accept any email and password, and have the results page display the orders associated with that email address.
- I used Bootstrap since I am most familiar with it and it works well with my pizza maker UI
  - I added a lot of my own css, including but not limited to: containers, image styling, navbar, footer, and button styling, background styling, and input styling
- Express middleware
- - express.json(): Built-in middleware in Express that parses incoming requests with JSON payloads, effectively reading data sent through HTTP POST request and making it accessible via req.body.
- - express.static(): Serves static files such as images, CSS files, and JavaScript files from a directory, making these files accessible through the web.
- - cors(): Middleware package used to enable CORS (Cross-Origin Resource Sharing) with various options. It allows or restricts requested resources on a web server depending on where the HTTP request was initiated from.
- - mongoose: Mongoose is used to facilitate modeling and working with MongoDB database, enabling data validation, casting, and business logic layer.
- - dotenv.config(): Loads environment variables from a .env file into process.env, providing a secure and efficient way to store configuration settings outside of codebase (e.g., database connection strings, secret keys).

## Technical Achievements
- **Hosting on Render**: I decided to host my website on Render since everyone in the Slack gave it a high review. It was very easy to deploy on this website, however the deployment process took much longer than on Glitch.

### Design/Evaluation Achievements
- **Accessibility from W3C**: I followed the following tips from the W3C Web Accessibility Initiative...
- - Use headings to convey meaning and structure: I used a heading for the order form and subheadings for the questions
- - Make link text meaningful: My links come in the form of buttons that describe where they go
- - Provide clear instructions: My webpage provides clear instructions when a user does not submit the required information in the form
- - Keep content clear and concise: My questions are straightforward and to-the-point
- - Provide sufficient contrast between foreground and background: Made the shades of pink and blue darker to contrast with the white more
- - Don’t use color alone to convey information: My ingredients are also conveyed using shape and color 
- - Ensure that interactive elements are easy to identify: I change the color of the buttons on hover / on form completion to show that they are clickable
- - Provide clear and consistent navigation options: Navigation between pages is always in the upper right hand corner
- - Ensure that form elements include clearly associated labels: All form elements have a descript label excpet for the ingredient picker, which is obvious
- - Provide easily identifiable feedback: This is done through the form submission when a required field is missing data
- - Use headings and spacing to group related content: I space the pizza nd the ingredients in a way that defines them into 2 different groups
- - Create designs for different viewport sizes: I use bootstrap so that the form scales to mobile as well.
- **CRAP Principles**:
- - Contrast: The most striking element of contrast on each page of my website is the vibrant banner and the bold, clear text. On the login page, the login form stands out due to its distinctive background and contrasting button colors, drawing immediate attention. The same principle applies to the order page, where the order form is the focal point against a minimalist background. This contrast not only emphasizes the most critical elements but also enhances readability and user engagement. To further delineate between different sections and elements, I utilized contrasting colors for buttons and links, making them instantly recognizable. The contrast between the background color and the font color across the website ensures that information is easily accessible and that users can focus on key actions and information.
- - Repetition: Throughout the site, a consistent color scheme, font family ("Poppins"), and button styling are used to create a cohesive user experience. This repetition reinforces the brand identity and aids in user navigation by setting clear expectations. The color palette, derived from the logo, extends to headings, buttons, and icons, ensuring a visually harmonious environment. The repeated use of rounded corners in elements like buttons, form fields, and images softens the design and contributes to a friendly and approachable user interface. By consistently applying these design elements, the website achieves a professional and unified look, enhancing the overall aesthetic appeal and usability.
- - Alignment: Alignment plays a crucial role in organizing information and guiding the user's eye through the content. On the login and order pages, form elements are aligned in a clean, vertical layout, making the forms appear orderly and easy to navigate. Text alignment, particularly in headers and body text, is carefully considered to create a visual hierarchy and improve readability. The alignment of text and images within sections follows a grid system, creating a balanced and aesthetically pleasing layout. This systematic approach to alignment not only organizes the content effectively but also enhances the visual appeal, making the website look more professional and trustworthy.
- - Proximity: Proximity is used to group related information together, creating a logical flow that enhances user understanding and navigation. On the order page, form elements related to personal information, delivery details, and order specifications are grouped together, making it intuitive for users to provide the necessary information. Similarly, the login page groups the email and password fields, visually indicating that these fields are part of the same action. This use of proximity eliminates confusion and helps users to efficiently complete tasks. By organizing visual information through proximity, the website ensures a seamless and user-friendly experience, guiding users naturally through their interactions with the site.
