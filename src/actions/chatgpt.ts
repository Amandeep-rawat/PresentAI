
"use server";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    if (!userExists ) {
      return { status: 403, error:  "User is not found in database" }
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
    console.log("reached 1")

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



// const existingLayouts=[
//   {
//     "id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
//     "type": "accentLeft",
//     "content": {
//       "id": "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
//       "name": "Column",
//       "type": "column",
//       "content": [
//         {
//           "id": "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
//           "name": "Resizable column",
//           "type": "resizable-column",
//           "content": [
//             {
//               "id": "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
//               "alt": "Teacher inspiring students in a classroom",
//               "name": "Image",
//               "type": "image",
//               "content": "https://res.cloudinary.com/drzy2f8he/image/upload/v1748755610/ai%20ppt/fcrjpioekjxxlijn3siq.png",
//               "className": "rounded-lg shadow-lg"
//             },
//             {
//               "id": "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
//                   "name": "Heading1",
//                   "type": "heading1",
//                   "content": "Teachers Shape Futures",
//                   "className": "text-4xl font-bold mb-4",
//                   "placeholder": "Heading1"
//                 },
//                 {
//                   "id": "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
//                   "name": "Paragraph",
//                   "type": "paragraph",
//                   "content": "Teachers play a crucial role in shaping students' academic and personal development.",
//                   "className": "text-lg",
//                   "placeholder": "Start typing here"
//                 }
//               ],
//               "className": "w-full h-full p-8 flex flex-col justify-center items-start"
//             }
//           ]
//         }
//       ]
//     },
//     "className": "min-h-[400px] bg-gradient-to-r from-blue-500 to-blue-300 text-white",
//     "slideName": "Teacher Impact"
//   },
//   {
//     "id": "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
//     "type": "accentRight",
//     "content": {
//       "id": "3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
//       "name": "Column",
//       "type": "column",
//       "content": [
//         {
//           "id": "4c5d6e7f-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
//           "name": "Resizable column",
//           "type": "resizable-column",
//           "content": [
//             {
//               "id": "5d6e7f8g-9h0i-1j2k-3l4m-5n6o7p8q9r0s",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "6e7f8g9h-0i1j-2k3l-4m5n-6o7p8q9r0s1t",
//                   "name": "Heading1",
//                   "type": "heading1",
//                   "content": "Imparting Essential Skills",
//                   "className": "text-4xl font-bold mb-4",
//                   "placeholder": "Heading1"
//                 },
//                 {
//                   "id": "7f8g9h0i-1j2k-3l4m-5n6o-7p8q9r0s1t2u",
//                   "name": "Paragraph",
//                   "type": "paragraph",
//                   "content": "They impart knowledge and skills essential for students' future success and well-being.",
//                   "className": "text-lg",
//                   "placeholder": "Start typing here"
//                 }
//               ],
//               "className": "w-full h-full p-8 flex flex-col justify-center items-start"
//             },
//             {
//               "id": "8g9h0i1j-2k3l-4m5n-6o7p-8q9r0s1t2u3v",
//               "alt": "Teacher teaching students in a science lab",
//               "name": "Image",
//               "type": "image",
//               "content": "https://res.cloudinary.com/drzy2f8he/image/upload/v1748755608/ai%20ppt/ybx5pji31sdpbaugnjju.png",
//               "className": "rounded-lg shadow-lg"
//             }
//           ]
//         }
//       ]
//     },
//     "className": "min-h-[400px] bg-gradient-to-l from-green-500 to-green-300 text-white",
//     "slideName": "Knowledge Transfer"
//   },
//   {
//     "id": "3a4b5c6d-7e8f-9g0h-1i2j-3k4l5m6n7o8p",
//     "type": "imageAndText",
//     "content": {
//       "id": "4b5c6d7e-8f9g-0h1i-2j3k-4l5m6n7o8p9q",
//       "name": "Column",
//       "type": "column",
//       "content": [
//         {
//           "id": "5c6d7e8f-9g0h-1i2j-3k4l-5m6n7o8p9q0r",
//           "name": "Image and text",
//           "type": "resizable-column",
//           "content": [
//             {
//               "id": "6d7e8f9g-0h1i-2j3k-4l5m-6n7o8p9q0r1s",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "7e8f9g0h-1i2j-3k4l-5m6n-7o8p9q0r1s2t",
//                   "alt": "Teacher mentoring a student one-on-one",
//                   "name": "Image",
//                   "type": "image",
//                   "content": "https://res.cloudinary.com/drzy2f8he/image/upload/v1748755611/ai%20ppt/b65yzrua2e1ryvc8l5qo.png",
//                   "className": "rounded-t-lg"
//                 }
//               ]
//             },
//             {
//               "id": "8f9g0h1i-2j3k-4l5m-6n7o-8p9q0r1s2t3u",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "9g0h1i2j-3k4l-5m6n-7o8p-9q0r1s2t3u4v",
//                   "name": "Heading1",
//                   "type": "heading1",
//                   "content": "Guiding Through Challenges",
//                   "className": "text-3xl font-bold mb-4",
//                   "placeholder": "Heading1"
//                 },
//                 {
//                   "id": "0h1i2j3k-4l5m-6n7o-8p9q-0r1s2t3u4v5w",
//                   "name": "Paragraph",
//                   "type": "paragraph",
//                   "content": "Teachers serve as mentors, guiding students through challenges and fostering critical thinking.",
//                   "className": "text-lg",
//                   "placeholder": "Start typing here"
//                 }
//               ],
//               "className": "w-full h-full p-8 flex flex-col justify-center items-start"
//             }
//           ],
//           "className": "border rounded-lg shadow-lg"
//         }
//       ]
//     },
//     "className": "min-h-[400px] bg-white text-gray-800",
//     "slideName": "Mentorship"
//   },
//   {
//     "id": "4a5b6c7d-8e9f-0g1h-2i3j-4k5l6m7n8o9p",
//     "type": "textAndImage",
//     "content": {
//       "id": "5b6c7d8e-9f0g-1h2i-3j4k-5l6m7n8o9p0q",
//       "name": "Column",
//       "type": "column",
//       "content": [
//         {
//           "id": "6c7d8e9f-0g1h-2i3j-4k5l-6m7n8o9p0q1r",
//           "name": "Text and image",
//           "type": "resizable-column",
//           "content": [
//             {
//               "id": "7d8e9f0g-1h2i-3j4k-5l6m-7n8o9p0q1r2s",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "8e9f0g1h-2i3j-4k5l-6m7n-8o9p0q1r2s3t",
//                   "name": "Heading1",
//                   "type": "heading1",
//                   "content": "Beyond Academics",
//                   "className": "text-4xl font-bold mb-4",
//                   "placeholder": "Heading1"
//                 },
//                 {
//                   "id": "9f0g1h2i-3j4k-5l6m-7n8o-9p0q1r2s3t4u",
//                   "name": "Paragraph",
//                   "type": "paragraph",
//                   "content": "Their influence extends beyond academics, promoting social and emotional growth in students.",
//                   "className": "text-lg",
//                   "placeholder": "Start typing here"
//                 }
//               ],
//               "className": "w-full h-full p-8 flex flex-col justify-center items-start"
//             },
//             {
//               "id": "0g1h2i3j-4k5l-6m7n-8o9p-0q1r2s3t4u5v",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "1h2i3j4k-5l6m-7n8o-9p0q-1r2s3t4u5v6w",
//                   "alt": "Students collaborating on a group project",
//                   "name": "Image",
//                   "type": "image",
//                   "content": "https://res.cloudinary.com/drzy2f8he/image/upload/v1748755610/ai%20ppt/guwmwk4xa2bw2oeabdmn.png",
//                   "className": "rounded-r-lg"
//                 }
//               ]
//             }
//           ],
//           "className": "border rounded-lg shadow-lg"
//         }
//       ]
//     },
//     "className": "min-h-[400px] bg-gradient-to-r from-purple-500 to-purple-300 text-white",
//     "slideName": "Holistic Development"
//   },
//   {
//     "id": "5a6b7c8d-9e0f-1g2h-3i4j-5k6l7m8n9o0p",
//     "type": "twoColumns",
//     "content": {
//       "id": "6b7c8d9e-0f1g-2h3i-4j5k-6l7m8n9o0p1q",
//       "name": "Column",
//       "type": "column",
//       "content": [
//         {
//           "id": "7c8d9e0f-1g2h-3i4j-5k6l-7m8n9o0p1q2r",
//           "name": "Title",
//           "type": "title",
//           "content": "Building Inclusive Spaces",
//           "className": "text-4xl font-bold mb-8",
//           "placeholder": "Untitled Card"
//         },
//         {
//           "id": "8d9e0f1g-2h3i-4j5k-6l7m-8n9o0p1q2r3s",
//           "name": "Text and image",
//           "type": "resizable-column",
//           "content": [
//             {
//               "id": "9e0f1g2h-3i4j-5k6l-7m8n-9o0p1q2r3s4t",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "0f1g2h3i-4j5k-6l7m-8n9o-0p1q2r3s4t5u",
//                   "name": "Heading3",
//                   "type": "heading3",
//                   "content": "Positive Learning",
//                   "className": "text-2xl font-bold mb-2",
//                   "placeholder": "Heading 3"
//                 },
//                 {
//                   "id": "1g2h3i4j-5k6l-7m8n-9o0p-1q2r3s4t5u6v",
//                   "name": "Paragraph",
//                   "type": "paragraph",
//                   "content": "Teachers contribute to building a positive and inclusive learning environment for all students.",
//                   "className": "text-lg",
//                   "placeholder": "Start typing..."
//                 }
//               ]
//             },
//             {
//               "id": "2h3i4j5k-6l7m-8n9o-0p1q-2r3s4t5u6v7w",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "3i4j5k6l-7m8n-9o0p-1q2r-3s4t5u6v7w8x",
//                   "alt": "Diverse students working together in a classroom",
//                   "name": "Image",
//                   "type": "image",
//                   "content": "https://res.cloudinary.com/drzy2f8he/image/upload/v1748755612/ai%20ppt/vyzo33wy2zcywvjcx9xm.png",
//                   "className": "rounded-lg"
//                 }
//               ]
//             }
//           ],
//           "className": "border rounded-lg shadow-lg grid grid-cols-2 gap-8"
//         }
//       ]
//     },
//     "className": "min-h-[400px] bg-white text-gray-800",
//     "slideName": "Inclusive Environment"
//   },
//   {
//     "id": "6a7b8c9d-0e1f-2g3h-4i5j-6k7l8m9n0o1p",
//     "type": "accentLeft",
//     "content": {
//       "id": "7b8c9d0e-1f2g-3h4i-5j6k-7l8m9n0o1p2q",
//       "name": "Column",
//       "type": "column",
//       "content": [
//         {
//           "id": "8c9d0e1f-2g3h-4i5j-6k7l-8m9n0o1p2q3r",
//           "name": "Resizable column",
//           "type": "resizable-column",
//           "content": [
//             {
//               "id": "9d0e1f2g-3h4i-5j6k-7l8m-9n0o1p2q3r4s",
//               "alt": "Dedicated teacher grading papers late at night",
//               "name": "Image",
//               "type": "image",
//               "content": "https://res.cloudinary.com/drzy2f8he/image/upload/v1748755604/ai%20ppt/gum1qac2j1ouvuprkait.png",
//               "className": "rounded-lg shadow-lg"
//             },
//             {
//               "id": "0e1f2g3h-4i5j-6k7l-8m9n-0o1p2q3r4s5t",
//               "name": "Column",
//               "type": "column",
//               "content": [
//                 {
//                   "id": "1f2g3h4i-5j6k-7l8m-9n0o-1p2q3r4s5t6u",
//                   "name": "Heading1",
//                   "type": "heading1",
//                   "content": "Dedication and Expertise",
//                   "className": "text-4xl font-bold mb-4",
//                   "placeholder": "Heading1"
//                 },
//                 {
//                   "id": "2g3h4i5j-6k7l-8m9n-0o1p-2q3r4s5t6u7v",
//                   "name": "Paragraph",
//                   "type": "paragraph",
//                   "content": "The dedication and expertise of teachers are fundamental to the advancement of education and society.",
//                   "className": "text-lg",
//                   "placeholder": "Start typing here"
//                 }
//               ],
//               "className": "w-full h-full p-8 flex flex-col justify-center items-start"
//             }
//           ]
//         }
//       ]
//     },
//     "className": "min-h-[400px] bg-gradient-to-r from-orange-500 to-orange-300 text-white",
//     "slideName": "Teacher Dedication"
//   }
// ]
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
    // return "https://th.bing.com/th/id/OIP.halNqneY_qDUKc8jbePvrwHaEK?rs=1&pid=ImgDetMain"
    // throw new Error('faild to genrate image')
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
