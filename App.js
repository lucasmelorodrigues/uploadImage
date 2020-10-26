import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from 'axios';

export default function Upload() {
  const [avatar, setAvatar] = useState();

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Permissão necessária.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }
    setAvatar(data);
  }

  async function uploadImage() {
    const data = new FormData();

    data.append("avatar", {
      uri: avatar.uri,
      type: avatar.type,
    });
    await Axios.post('http://localhost:3333/files', data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: avatar
                ? avatar.uri
                : "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
            }}
            style={styles.avatar} />
        </View>
        <View style={styles.form}>
          <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
            <Text style={styles.buttonText}>Procurar Imagem</Text>
          </TouchableOpacity>
          
          <Text/>

          <TouchableOpacity style={styles.button} onPress={uploadImage}>
            <Text style={styles.buttonText}>Enviar Imagem</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 42,
    backgroundColor: "#5A9AAB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 100
  },
  avatar: {
    flex: 1,
    width: undefined,
    height: undefined
  },
});
