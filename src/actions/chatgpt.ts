
"use server";
import { CohereClientV2 } from "cohere-ai";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid'
import { ContentItem, ContentType, Slide } from "@/lib/types";
// const ImagePig = require('imagepig');
import {cloudinary} from '../lib/cloudinary'; // your Cloudinary config file
import fetch from 'node-fetch'; // If running server-side in Node.js
import FormData from 'form-data';

export const generateCreativePrompt = async (userPrompt: string) => {
  const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY || "",
  });

  const finalPrompt = `
Create a coherent and relevant outline for the following prompt: ${userPrompt}.
The outline should consist of at least 6 points. Ensure the outline is well-structured and directly related to the topic. Return the output in the following JSON format:
{
  "outlines": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5",
    "Point 6"
  ]
}
Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
`;

  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: finalPrompt,
        },
      ],
    });
    console.log("respnse ", response);

    const contentArray = response?.message?.content;
    console.log("contentArray", contentArray);
    if (
      Array.isArray(contentArray) &&
      contentArray.length > 0 &&
      typeof contentArray[0].text === "string"
    ) {
      // 🔥 Remove markdown backticks like ```json ... ```
      const cleanedText = contentArray[0].text
        .replace(/```json|```/g, "") // remove code block markers
        .trim();

      try {
        const jsonResponse = JSON.parse(cleanedText);
        return {
          status: 200,
          data: jsonResponse,
        };
      } catch (err) {
        return {
          
          status: 500,
          error: "Invalid JSON format",
        };
      }
    }

    return {
      status: 400,
      error: "No content generated",
    };
  } catch (error) {
    return {
      status: 500,
      error: "Something went wrong",
    };
  }
};


export const generateLayouts = async (projectId: string, theme: string) => {
  try {
    if (!projectId) {
      return { status: 400, error: "No project Id found" }
    }
    const user = await currentUser();
    if (!user) {
      return { status: 403, error: "User not authenticated" }
    }
    const userExists = await client.user.findUnique({
      where: { clerkId: user.id }
    })
    if (!userExists || !userExists.subscription) {
      return { status: 403, error: !userExists?.subscription ? 'User does not have an active subscription' : "User is not found in database" }
    }

    const project = await client.project.findUnique({
      where: {
        id: projectId, isDeleted: false
      }
    })
    if (!project) {
      return { status: 404, error: "Project not found" }
    }
    if (!project.outlines || project.outlines.length === 0) {
      return { status: 404, error: "No outlines found" }
    }

    const layouts = await getGenerateLayoutsJson(project.outlines);
    if (layouts.status !== 200) {
      return layouts
    }
    await client.project.update({
      where: { id: project.id },
      data: { slides: layouts.data, themeName: theme }
    })

    return { status: 200, data: layouts.data }
  } catch (error) {
    console.log("error", error);
    return { status: 500, error: "Something went wrong", data: [] }
  }
}


const existingLayouts = [
  {
    id: uuidv4(),
    slideName: "Blank card",
    type: "blank-card",
    className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Accent left",
    type: "accentLeft",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      restrictDropTo: true,
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Accent Right",
    type: "accentRight",
    className: "min-h-[300px]",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Resizable column",
          restrictToDrop: true,
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
            {
              id: uuidv4(),
              type: "image" as ContentType,
              name: "Image",
              restrictToDrop: true,
              content:
                "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Title",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Image and text",
    type: "imageAndText",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Image and text",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Text and image",
    type: "textAndImage",
    className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "",
              content: [
                {
                  id: uuidv4(),
                  type: "heading1" as ContentType,
                  name: "Heading1",
                  content: "",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "start typing here",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "image" as ContentType,
                  name: "Image",
                  className: "p-3",
                  content:
                    "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Title",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Two columns",
    type: "twoColumns",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "Paragraph",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "Paragraph",
              content: "",
              placeholder: "Start typing...",
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Two columns with headings",
    type: "twoColumnsWithHeadings",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading3" as ContentType,
                  name: "Heading3",
                  content: "",
                  placeholder: "Heading 3",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
            {
              id: uuidv4(),
              type: "column" as ContentType,
              name: "Column",
              content: [
                {
                  id: uuidv4(),
                  type: "heading3" as ContentType,
                  name: "Heading3",
                  content: "",
                  placeholder: "Heading 3",
                },
                {
                  id: uuidv4(),
                  type: "paragraph" as ContentType,
                  name: "Paragraph",
                  content: "",
                  placeholder: "Start typing...",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  {
    id: uuidv4(),
    slideName: "Three column",
    type: "threeColumns",
    className: "p-4 mx-auto flex justify-center items-center",
    content: {
      id: uuidv4(),
      type: "column" as ContentType,
      name: "Column",
      content: [
        {
          id: uuidv4(),
          type: "title" as ContentType,
          name: "Title",
          content: "",
          placeholder: "Untitled Card",
        },
        {
          id: uuidv4(),
          type: "resizable-column" as ContentType,
          name: "Text and image",
          className: "border",
          content: [
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
            {
              id: uuidv4(),
              type: "paragraph" as ContentType,
              name: "",
              content: "",
              placeholder: "Start typing...",
            },
          ],
        },
      ],
    },
  },
];
const findImageComponents = (layout: ContentItem): ContentItem[] => {
  const images = [];
  if (layout.type === 'image') {
    images.push(layout)
  }
  if (Array.isArray(layout.content)) {
    layout.content.forEach((child) => {
      images.push(...findImageComponents(child as ContentItem))
    })
  }
  else if (layout.content && typeof layout.content === 'object') {
    images.push(...findImageComponents(layout.content))
  }
  return images;
}


// const generateImageUrl = async (prompt: string): Promise<string> => {
//   try {
//     const improvedPrompt = `
//     Create highly realistic professional image based on the following description. The image should look as if captured in real life with attention to details, lighting, and texture.
//     Description: ${prompt}
//     Important Notes:
//     - The image must be in a photo-realistic style and visually compelling.
//     - Ensure all text, signs, or visible writing in the image are in English.
//     - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
//     - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentation.
//     - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided. Example use cases: business presentations, educational slides, and professional designs.
//     `;
//     const imagepig_api_key=process.env.IMAGEPIG_API_KEY
//     const imagepig = ImagePig(imagepig_api_key);
//     const result = await imagepig.default(improvedPrompt);


//     // Accessing 'data' and 'content' to check for URL or image data
//     const data = await result.data;
//     // console.log('✅ Data:', data);  // Checking what data contains

//     // If URL is present in the content field
//     const content = await result.content;
//     // console.log('✅ Content:', content);  // Checking what content contains

//     return content.image_data || 'https://th.bing.com/th/id/OIP.halNqneY_qDUKc8jbePvrwHaEK?rs=1&pid=ImgDetMain';
//   } catch (error) {
//     console.error('❌ Error generating image:', error);
//     return 'https://th.bing.com/th/id/OIP.halNqneY_qDUKc8jbePvrwHaEK?rs=1&pid=ImgDetMain';
//   }
// };

// const generateImageUrl = async (prompt: string): Promise<string> => {
//   try {
//     const improvedPrompt = `
//     Create highly realistic professional image based on the following description. The image should look as if captured in real life with attention to details, lighting, and texture.
//     Description: ${prompt}
//     Important Notes:
//     - The image must be in a photo-realistic style and visually compelling.
//     - Ensure all text, signs, or visible writing in the image are in English.
//     - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
//     - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentation.
//     - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided. Example use cases: business presentations, educational slides, and professional designs.
//     `;

//     const form = new FormData();
//     form.append('prompt', improvedPrompt);

//     const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
//       method: 'POST',
//       headers: {
//         'x-api-key': process.env.CLIPDROP_API_KEY as string,
//       },
//       body: form,
//     });

//     const buffer = await response.arrayBuffer();
//     const base64 = Buffer.from(buffer).toString('base64');
//     const base64Image = `data:image/png;base64,${base64}`;

//     return base64Image;
//   } catch (error) {
//     console.error('❌ Error generating image with Clipdrop:', error);
//     return 'https://th.bing.com/th/id/OIP.halNqneY_qDUKc8jbePvrwHaEK?rs=1&pid=ImgDetMain'; // fallback image
//   }
// };


// 
// with clounary 


const generateImageUrl = async (prompt: string): Promise<string> => {
  try {
    const improvedPrompt = `
      Create highly realistic professional image based on the following description. The image should look as if captured in real life with attention to details, lighting, and texture.
      Description: ${prompt}
      Important Notes:
      - The image must be in a photo-realistic style and visually compelling.
      - Ensure all text, signs, or visible writing in the image are in English.
      - Pay special attention to lighting, shadows, and textures to make the image as lifelike as possible.
      - Avoid elements that appear abstract, cartoonish, or overly artistic. The image should be suitable for professional presentation.
      - Focus on accurately depicting the concept described, including specific objects, environment, mood, and context. Maintain relevance to the description provided. Example use cases: business presentations, educational slides, and professional designs.
    `;

    // Prepare form data for Clipdrop API
    const form = new FormData();
    form.append('prompt', improvedPrompt);

    // Call Clipdrop API
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY as string,
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Clipdrop API error: ${response.statusText}`);
    }

    // Get image buffer from response
    const buffer = await response.arrayBuffer();

    // Upload to Cloudinary
    // Cloudinary uploader expects a base64 string or file path, so convert buffer to base64 string without data URI prefix
    const base64Str = Buffer.from(buffer).toString('base64');

    // Upload to Cloudinary with folder name
    const uploadResult = await cloudinary.uploader.upload(`data:image/png;base64,${base64Str}`, {
      folder: 'ai ppt', // your folder name here
      resource_type: 'image',
    });

    // Return the Cloudinary secure URL
    return uploadResult.secure_url;
  } catch (error) {
    console.error('❌ Error generating or uploading image:', error);
    // fallback image URL
    return 'https://th.bing.com/th/id/OIP.halNqneY_qDUKc8jbePvrwHaEK?rs=1&pid=ImgDetMain';
  }
};




const replaceImagePlaceholders = async (layout: Slide) => {
  const imageComponents = findImageComponents(layout.content)
  console.log('found image compoennts',imageComponents)
  for (const component of imageComponents){
    console.log('generating image for components:',component.alt)
    component.content=await generateImageUrl(component.alt ||'Placeholder Image')
  }
}




export const getGenerateLayoutsJson = async (outlineArray: string[]) => {
  const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY || "",
  });

  const prompt = `
You are a highly creative AI that generates JSON-based layouts for presentations. I will provide you with an array of outlines, and for each outline you must generate a unique and creative layout. Use the existing layout as examples for structure and design, and generate a unique design based on the provided outline.

### Guidelines:
1. Write layouts based on the specific outline provided.
2. Use diverse and engaging designs ensuring each layout is unique.
3. Adhere to the structure of existing layouts but add new styles or components if needed.
4. Fill placeholder data into content fields where required.
5. Generate unique image placeholders for the 'content' property of image components, and also alt text according to the outline.
6. Ensure proper formatting and schema alignment for the output JSON.

### Example Layouts:
${JSON.stringify(existingLayouts, null, 2)}

### Outline Array:
${JSON.stringify(outlineArray)}

For each entry in the outline array, generate:
- A unique JSON layout with creative designs.
- Properly filled content, including placeholders for image components.
- Clear and well-structured JSON data.

For images:
- The alt text should describe the image clearly and concisely.

Return the output in **valid JSON format** only without extra text or markdown.
`;

  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const contentArray = response?.message?.content;

    if (
      Array.isArray(contentArray) &&
      contentArray.length > 0 &&
      typeof contentArray[0].text === "string"
    ) {
      const cleanedText = contentArray[0].text
        .replace(/```json|```/g, "") // clean markdown
        .trim();

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(cleanedText);
        await Promise.all(jsonResponse.map(replaceImagePlaceholders));
        return { status: 200, data: jsonResponse };
      } catch (err) {
        throw new Error("Invalid JSON format received from AI");
      }
    }

    return {
      status: 400,
      error: "No content generated",
    };
  } catch (error) {
    return {
      status: 500,
      error: "Internal server error",
    };
  }
};
