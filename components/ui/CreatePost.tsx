import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CreatePostProps {
  onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sending, setSending] = useState(false);

  const createPost = async () => {
    if (!title.trim() || !content.trim() || !imageUrl.trim()) return;
    setSending(true);
    await fetch('http://localhost:3000/add-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageUrl }),
    });
    setTitle('');
    setContent('');
    setImageUrl('');
    setShowForm(false);
    setSending(false);
    onPostCreated();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.smallButton} onPress={() => setShowForm(v => !v)}>
          <Text style={styles.buttonText}>{showForm ? 'Cancel' : 'Create Post'}</Text>
        </TouchableOpacity>
      </View>
      {showForm && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={content}
            onChangeText={setContent}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.smallButton} onPress={createPost} disabled={sending}>
              <Text style={styles.buttonText}>{sending ? 'Creating...' : 'Create'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  form: {
    marginTop: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
    marginBottom: 4,
  },
  smallButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 70,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
