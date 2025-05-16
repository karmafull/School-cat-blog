import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function BlogDetailsScreen() {
  const { id } = useLocalSearchParams();
  const postId = String(id);

  const [post, setPost] = useState<any>(null);
  const [loadingPost, setLoadingPost] = useState(true);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);

  // Fetch post
  useEffect(() => {
    setLoadingPost(true);
    fetch(`http://localhost:3000/post/${postId}`)
      .then(res => res.json())
      .then(setPost)
      .finally(() => setLoadingPost(false));
  }, [postId]);

  // Fetch comments
  const fetchComments = () => {
    setLoadingComments(true);
    fetch(`http://localhost:3000/post/${postId}/comments`)
      .then(res => res.json())
      .then(setComments)
      .finally(() => setLoadingComments(false));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Send comment
  const sendComment = async () => {
    if (!name.trim() || !comment.trim()) return;
    setSending(true);
    await fetch('http://localhost:3000/add-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, comment, postId })
    });
    setComment('');
    setSending(false);
    fetchComments();
  };

  if (loadingPost) return <View style={styles.outer}><ActivityIndicator size="large" /></View>;
  if (!post) return <Text>Post not found</Text>;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f6f6f6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.postCard}>
          <View style={styles.imageBox}>
            <Image source={{ uri: post.imageUrl }} style={styles.image} resizeMode="cover" />
          </View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
        </View>
        <View style={styles.commentSection}>
          <Text style={styles.commentHeader}>Comments</Text>
          <TextInput
            style={styles.commentInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Write a comment..."
            multiline
          />
          <Button title={sending ? "Sending..." : "Send comment"} onPress={sendComment} disabled={sending} />
          {loadingComments ? (
            <ActivityIndicator style={{ marginTop: 16 }} />
          ) : (
            comments.length === 0 ? (
              <Text style={styles.noComments}>No comments yet.</Text>
            ) : (
              comments.map((c, idx) => (
                <View key={idx} style={styles.commentBubble}>
                  <Text style={styles.commentText}>{c.comment}</Text>
                  <Text style={styles.commentName}>— {c.name}</Text>
                </View>
              ))
            )
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    minHeight: '100%',
  },
  postCard: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignSelf: 'center',
  },
  imageBox: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 32,
  },
  commentSection: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignSelf: 'center',
  },
  commentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  commentInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  noComments: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
    textAlign: 'center',
  },
  commentBubble: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  commentName: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
