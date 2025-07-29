import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const dummyPosts = [
  {
    id: 1,
    author: { id: 1, name: 'Jane Doe' },
    title: 'Magical Morning in Cappadocia',
    location: 'Cappadocia, Turkey',
    date: 'July 2025',
    content: `Watched the sunrise as hot air balloons filled the sky—absolutely surreal.\nFloated above valleys, wandered through ancient underground cities, and ended the day with wine under a glowing sunset.\nLike stepping into a dream.`,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    reactions: ['👍', '❤️', '😂'],
    comments: [
      { id: 1, author: { id: 2, name: 'John Smith' }, text: 'This sounds amazing! Cappadocia is on my bucket list.', reactions: ['👍', '❤️', '😂'] },
      { id: 2, author: { id: 3, name: 'Emily Rose' }, text: 'Beautifully described. The balloons must have been magical!', reactions: ['👍', '❤️', '😂'] },
    ],
  },
  {
    id: 2,
    author: { id: 2, name: 'John Smith' },
    title: 'Exploring Kyoto',
    location: 'Kyoto, Japan',
    date: 'June 2025',
    content: 'Wandered through bamboo forests, visited ancient temples, and enjoyed matcha ice cream by the river. Kyoto is a city where tradition meets tranquility.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    reactions: ['👍', '❤️', '😂'],
    comments: [
      { id: 3, author: { id: 1, name: 'Jane Doe' }, text: 'Kyoto is so peaceful! Did you try the tea ceremony?', reactions: ['👍', '❤️', '😂'] },
    ],
  },
];
const POSTS_PER_PAGE = 1;

function MainPage() {
  const [page, setPage] = useState(1);
  const [postReactions, setPostReactions] = useState({});
  const [commentReactions, setCommentReactions] = useState({});

  const paginatedPosts = dummyPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const totalPages = Math.ceil(dummyPosts.length / POSTS_PER_PAGE);

  const handlePostReaction = (postId, idx) => {
    setPostReactions({ ...postReactions, [postId]: idx });
  };

  const handleCommentReaction = (commentId, idx) => {
    setCommentReactions({ ...commentReactions, [commentId]: idx });
  };

  return (
    <div className="main-container">
      {paginatedPosts.map(post => (
        <div className="post-card" key={post.id}>
          <img className="post-image" src={post.image} alt={post.title} />
          <div className="post-body">
            <div className="post-header">
              <span className="post-title">{post.title}</span>
              <span className="post-location">{post.location} • {post.date}</span>
            </div>
            <div className="author">
              by <Link to={`/author/${post.author.id}`}>{post.author.name}</Link>
            </div>
            <div className="content">{post.content.split('\n').map((line, i) => <div key={i}>{line}</div>)}</div>
            <div className="reactions">
              {post.reactions.map((icon, idx) => (
                <span
                  key={icon}
                  className={postReactions[post.id] === idx ? 'reaction active' : 'reaction'}
                  onClick={() => handlePostReaction(post.id, idx)}
                  role="button"
                  tabIndex={0}
                >
                  {icon}
                </span>
              ))}
            </div>
            <div className="comments">
              {post.comments.map(comment => (
                <div className="comment" key={comment.id}>
                  <span className="comment-author">
                    <Link to={`/author/${comment.author.id}`}>{comment.author.name}</Link>:
                  </span>
                  <span className="comment-text"> {comment.text}</span>
                  <span className="comment-reactions">
                    {comment.reactions.map((icon, idx) => (
                      <span
                        key={icon}
                        className={commentReactions[comment.id] === idx ? 'reaction active' : 'reaction'}
                        onClick={() => handleCommentReaction(comment.id, idx)}
                        role="button"
                        tabIndex={0}
                      >
                        {icon}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? 'page-btn active' : 'page-btn'}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
