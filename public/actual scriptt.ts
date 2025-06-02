// main real 
// const existingLayouts = [
//   {
//     id: uuidv4(),
//     slideName: "Blank card",
//     type: "blank-card",
//     className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "title" as ContentType,
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: "Accent left",
//     type: "accentLeft",
//     className: "min-h-[300px]",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       restrictDropTo: true,
//       content: [
//         {
//           id: uuidv4(),
//           type: "resizable-column" as ContentType,
//           name: "Resizable column",
//           restrictToDrop: true,
//           content: [
//             {
//               id: uuidv4(),
//               type: "image" as ContentType,
//               name: "Image",
//               content:
//                 "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//               alt: "Title",
//             },
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "Column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading1" as ContentType,
//                   name: "Heading1",
//                   content: "",
//                   placeholder: "Heading1",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph" as ContentType,
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "start typing here",
//                 },
//               ],
//               className: "w-full h-full p-8 flex justify-center items-center",
//               placeholder: "Heading1",
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: "Accent Right",
//     type: "accentRight",
//     className: "min-h-[300px]",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "resizable-column" as ContentType,
//           name: "Resizable column",
//           restrictToDrop: true,
//           content: [
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "Column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading1" as ContentType,
//                   name: "Heading1",
//                   content: "",
//                   placeholder: "Heading1",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph" as ContentType,
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "start typing here",
//                 },
//               ],
//               className: "w-full h-full p-8 flex justify-center items-center",
//               placeholder: "Heading1",
//             },
//             {
//               id: uuidv4(),
//               type: "image" as ContentType,
//               name: "Image",
//               restrictToDrop: true,
//               content:
//                 "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//               alt: "Title",
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: "Image and text",
//     type: "imageAndText",
//     className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "resizable-column" as ContentType,
//           name: "Image and text",
//           className: "border",
//           content: [
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "Column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "image" as ContentType,
//                   name: "Image",
//                   className: "p-3",
//                   content:
//                     "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//                   alt: "Title",
//                 },
//               ],
//             },
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "Column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading1" as ContentType,
//                   name: "Heading1",
//                   content: "",
//                   placeholder: "Heading1",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph" as ContentType,
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "start typing here",
//                 },
//               ],
//               className: "w-full h-full p-8 flex justify-center items-center",
//               placeholder: "Heading1",
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: "Text and image",
//     type: "textAndImage",
//     className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "resizable-column" as ContentType,
//           name: "Text and image",
//           className: "border",
//           content: [
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading1" as ContentType,
//                   name: "Heading1",
//                   content: "",
//                   placeholder: "Heading1",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph" as ContentType,
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "start typing here",
//                 },
//               ],
//               className: "w-full h-full p-8 flex justify-center items-center",
//               placeholder: "Heading1",
//             },
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "Column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "image" as ContentType,
//                   name: "Image",
//                   className: "p-3",
//                   content:
//                     "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//                   alt: "Title",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: "Two columns",
//     type: "twoColumns",
//     className: "p-4 mx-auto flex justify-center items-center",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "title" as ContentType,
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//         {
//           id: uuidv4(),
//           type: "resizable-column" as ContentType,
//           name: "Text and image",
//           className: "border",
//           content: [
//             {
//               id: uuidv4(),
//               type: "paragraph" as ContentType,
//               name: "Paragraph",
//               content: "",
//               placeholder: "Start typing...",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph" as ContentType,
//               name: "Paragraph",
//               content: "",
//               placeholder: "Start typing...",
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: "Two columns with headings",
//     type: "twoColumnsWithHeadings",
//     className: "p-4 mx-auto flex justify-center items-center",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "title" as ContentType,
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//         {
//           id: uuidv4(),
//           type: "resizable-column" as ContentType,
//           name: "Text and image",
//           className: "border",
//           content: [
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "Column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading3" as ContentType,
//                   name: "Heading3",
//                   content: "",
//                   placeholder: "Heading 3",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph" as ContentType,
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//               ],
//             },
//             {
//               id: uuidv4(),
//               type: "column" as ContentType,
//               name: "Column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading3" as ContentType,
//                   name: "Heading3",
//                   content: "",
//                   placeholder: "Heading 3",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph" as ContentType,
//                   name: "Paragraph",
//                   content: "",
//                   placeholder: "Start typing...",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   },

//   {
//     id: uuidv4(),
//     slideName: "Three column",
//     type: "threeColumns",
//     className: "p-4 mx-auto flex justify-center items-center",
//     content: {
//       id: uuidv4(),
//       type: "column" as ContentType,
//       name: "Column",
//       content: [
//         {
//           id: uuidv4(),
//           type: "title" as ContentType,
//           name: "Title",
//           content: "",
//           placeholder: "Untitled Card",
//         },
//         {
//           id: uuidv4(),
//           type: "resizable-column" as ContentType,
//           name: "Text and image",
//           className: "border",
//           content: [
//             {
//               id: uuidv4(),
//               type: "paragraph" as ContentType,
//               name: "",
//               content: "",
//               placeholder: "Start typing...",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph" as ContentType,
//               name: "",
//               content: "",
//               placeholder: "Start typing...",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph" as ContentType,
//               name: "",
//               content: "",
//               placeholder: "Start typing...",
//             },
//           ],
//         },
//       ],
//     },
//   },
// ];



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






// updated new one lets try this . 

