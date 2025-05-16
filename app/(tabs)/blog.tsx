import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BlogPostPreview from '../../components/ui/BlogPostPreview';
import CreatePost from '../../components/ui/CreatePost';

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  created_at?: string;
}

export default function BlogScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = () => {
    setLoading(true);
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    await fetch(`http://localhost:3000/post/${id}`, {
      method: 'DELETE',
    });
    fetchPosts();
  };

  if (loading) {
    return (
      <View style={styles.outer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.outer}>
      <Text style={styles.header}>Polytehnic cat blog</Text>
      <CreatePost onPostCreated={fetchPosts} />
      <ScrollView contentContainerStyle={styles.list}>
        {posts.map(post => (
          <View key={post.id} style={styles.card}>
            <BlogPostPreview
              title={post.title}
              content={post.content}
              image={{ uri: post.imageUrl }}
              created_at={post.created_at}
              onPress={() => router.push(`/${post.id}`)}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.smallButton, { backgroundColor: '#e74c3c' }]} onPress={() => deletePost(post.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 32,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 24,
    marginBottom: 16,
    color: '#222',
    letterSpacing: 1,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  card: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    paddingBottom: 8,
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