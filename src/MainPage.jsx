import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const dummyPosts = [
  {
    id: 1,
    author: { id: 1, name: 'Jane Doe' },
    content: 'This is a sample post!',
    reactions: ['👍', '❤️', '😂'],
    comments: [
      { id: 1, author: { id: 2, name: 'John Smith' }, text: 'Nice post!', reactions: ['👍', '❤️', '😂'] },
    ],
  },
  {
    id: 2,
    author: { id: 2, name: 'John Smith' },
    content: 'Another post here.',
    reactions: ['👍', '❤️', '😂'],
    comments: [],
  },
  // Add more posts as needed for pagination
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
        <div className="post" key={post.id}>
          <div className="author">
            <Link to={`/author/${post.author.id}`}>{post.author.name}</Link>
          </div>
          <div className="content">{post.content}</div>
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
