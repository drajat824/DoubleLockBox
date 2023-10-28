// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   ScrollView
// } from 'react-native';

// import Requestor from './../service/Requestor';

// import { Button } from 'react-native-paper';

// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import Axios from 'axios'


// const facelist_id = 'face_01';
// const facelist_data = {
//   name: 'wajah saya'
// };

// const face_api_base_url = 'https://doublelockbox.cognitiveservices.azure.com';
// const api_key = '2360f6bb3264415ba757f5b6abd31b31'

// const SimilarFaces = () => {
//   const [name, setName] = useState('');
//   const [photoStyle, setPhotoStyle] = useState({
//     width: 480,
//     height: 480
//   });
//   const [photo, setPhoto] = useState(null);
//   const [photoData, setPhotoData] = useState(null);
//   const [similarPhoto, setSimilarPhoto] = useState(null);
//   const [message, setMessage] = useState('');

//   const changeName = (text) => {
//     setName(text);
//   }

//   const pickImage = async () => {
//     options = {
//       title: 'Select Photo',
//       takePhotoButtonTitle: 'Take Photo...',
//       chooseFromLibraryButtonTitle: 'Choose from Library...',
//       cameraType: 'back',
//       mediaType: 'photo',
//       maxWidth: 480,
//       quality: 1,
//       noData: false,
//     }
//     // options = {
//     //     storageOptions: {
//     //       skipBackup: true,
//     //       path: 'images',
//     //     },
//     //   };
//       launchImageLibrary(options, (response) => {

//         console.log(response)

//         if (response.error) {
//           alert('Error getting the image. Please try again.');
//         } else {
//           const source = { uri: response.uri };
//           const photoStyle = {
//             width: response.width,
//             height: response.height
//           };
    
//           setPhotoStyle(photoStyle);
//           setPhoto(source);
//           setPhotoData(response.data);
//         }

//       })

      
//   }

//   const createFaceList = () => {

//     // const options = {
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Ocp-Apim-Subscription-Key': api_key,
//     //   }
//     // };
    
//     // Axios.put(`https://doublelockbox.cognitiveservices.azure.com/face/v1.0/facelists/face-01`, options)

//     // .then((res) => {
//     //   console.log(res)
//     // })

//     // .catch((err) => {
//     //   console.log(err)
//     // })

//     Requestor.request(
//       `${face_api_base_url}/face/v1.0/facelists/${facelist_id}`,
//       'PUT',
//       api_key, // Gantilah dengan API key yang sesuai
//       JSON.stringify(facelist_data)
//     )
//       .then((res) => {
//         console.log(res)
//         // alert('Face List Created!');
//       });
//   }

//   const addFaceToFaceList = () => {
//     const user_data = {
//       name: name,
//       filename: name
//     };

//     Requestor.upload(
//       `${face_api_base_url}/face/v1.0/facelists/${facelist_id}/persistedFaces`,
//       'POST',
//       api_key, // Gantilah dengan API key yang sesuai
//       photoData,
//       {
//         userData: JSON.stringify(user_data)
//       }
//     )
//       .then((res) => {
//         alert('Face was added to the face list!');
//       });
//   }

//   const getSimilarFace = () => {
//     Requestor.upload(
//       `${face_api_base_url}/face/v1.0/detect`,
//       'POST',
//       api_key, // Gantilah dengan API key yang sesuai
//       photoData
//     )

//     .then
//       // .then((facedetect_res) => {
//       //   console.log(facedetect_res, 'asdasdasd')
//       //   const face_id = facedetect_res[0].faceId;

//       //   const data = {
//       //     faceId: face_id,
//       //     faceListId: facelist_id,
//       //     maxNumOfCandidatesReturned: 2
//       //   };

//       //   Requestor.request(
//       //     `${face_api_base_url}/face/v1.0/findsimilars`,
//       //     'POST',
//       //     api_key, // Gantilah dengan API key yang sesuai
//       //     JSON.stringify(data)
//       //   )
//       //     .then((similarfaces_res) => {
//       //       const similar_face = similarfaces_res[1];

//       //       Requestor.request(
//       //         `${face_api_base_url}/face/v1.0/facelists/${facelist_id}`,
//       //         'GET',
//       //         api_key // Gantilah dengan API key yang sesuai
//       //       )
//       //         .then((facelist_res) => {
//       //           let user_data = {};
//       //           facelist_res['persistedFaces'].forEach((face) => {
//       //             if (face.persistedFaceId === similar_face.persistedFaceId) {
//       //               user_data = JSON.parse(face.userData);
//       //             }
//       //           });

//       //           setSimilarPhoto({ uri: user_data.filename });
//       //           setMessage(`Similar to: ${user_data.name} with confidence of ${similar_face.confidence}`);
//       //         });
//       //     });
//       // });
//   }

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Button
//           containerStyle={styles.button}
//           onPress={createFaceList}>
//           Create Face List
//         </Button>

//         <Image
//           style={photoStyle}
//           source={photo}
//           resizeMode="contain"
//         />

//         <Button
//           containerStyle={styles.button}
//           onPress={pickImage}>
//           Pick Image
//         </Button>

//         <TextInput
//           style={styles.text_input}
//           onChangeText={changeName}
//           value={name}
//           placeholder="name"
//         />

//         <Button
//           containerStyle={styles.button}
//           onPress={addFaceToFaceList}>
//           Add Face to Face List
//         </Button>

//         <Button
//           containerStyle={styles.button}
//           onPress={getSimilarFace}>
//           Get Similar Face
//         </Button>

//         <Image
//           style={photoStyle}
//           source={similarPhoto}
//           resizeMode="contain"
//         />

//         <Text style={styles.message}>{message}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center'
//   },
//   button: {
//     padding: 10,
//     margin: 20,
//     height: 45,
//     overflow: 'hidden',
//     backgroundColor: 'white'
//   },
//   text_input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     backgroundColor: '#FFF'
//   },
//   message: {
//     fontSize: 20,
//     fontWeight: 'bold'
//   }
// });

// export default SimilarFaces;
