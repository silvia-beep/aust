import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './AuthorProfile.css';

function AuthorProfile() {
  const { authorId } = useParams();
  // Dummy author data
  const authors = {
    1: { name: 'Jane Doe', bio: 'Minimal author profile.' },
    2: { name: 'John Smith', bio: 'Minimal author profile.' },
  };
  const author = authors[authorId] || { name: 'Unknown', bio: '' };

  return (
    <div className="author-profile">
      <h2>{author.name}</h2>
      <p>{author.bio}</p>
      <Link to="/">Back to posts</Link>
    </div>
  );
}

export default AuthorProfile;
