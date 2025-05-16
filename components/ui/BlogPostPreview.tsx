import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BlogPostPreview = ({ title, content, image, created_at, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.previewContainer}>
    <Image style={styles.image} source={image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={2} style={styles.content}>{content}</Text>
      <Text style={styles.content}>
        {created_at ? new Date(created_at).toLocaleDateString() : ''}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: '#444',
  },
});

export default BlogPostPreview;