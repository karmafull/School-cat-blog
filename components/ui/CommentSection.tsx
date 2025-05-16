import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// Define the type for a comment
interface Comment {
  name: string;
  comment: string;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [commentInput, setCommentInput] = useState('');
  const [commentName, setCommentName] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Fetch comments from backend
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/post/${postId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (e) {
      setComments([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Add comment to backend
  const handleAddComment = async () => {
    if (commentInput.trim() && commentName.trim()) {
      setSending(true);
      await fetch('http://localhost:3000/add-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, name: commentName.trim(), comment: commentInput.trim() }),
      });
      setCommentInput('');
      setSending(false);
      fetchComments();
    }
  };

  return (
    <View style={styles.commentSection}>
      <Text style={styles.commentHeader}>Comments</Text>
      <View style={styles.commentInputRow}>
        <TextInput
          style={[styles.commentInput, { flex: 0.1 }]}
          placeholder="Your name"
          value={commentName}
          onChangeText={setCommentName}
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.commentInput, { flex: 1 }]}
          placeholder="Add a comment..."
          value={commentInput}
          onChangeText={setCommentInput}
          onSubmitEditing={handleAddComment}
          returnKeyType="send"
        />
        <Button title={sending ? "Posting..." : "Post"} onPress={handleAddComment} disabled={sending} />
      </View>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : comments.length === 0 ? (
        <Text style={styles.noComments}>No comments yet.</Text>
      ) : (
        comments.map((c, idx) => (
          <View key={idx} style={styles.commentBubble}>
            <Text style={styles.commentText}>{c.comment}</Text>
            <Text style={styles.commentName}>— {c.name}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentSection: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  noComments: {
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  commentBubble: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  commentText: {
    fontSize: 15,
    color: '#222',
  },
  commentName: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
  },
});