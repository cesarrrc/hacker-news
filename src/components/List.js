import React from "react";
import { formatDistanceToNow } from "date-fns";

const List = ({ list }) => {
  return (
    <div className="list-container">
      {list.map((item, i) =>
        item.title ? (
          <div key={item.objectID} className="list-item">
            <div className="title-container">
              <a href={`https://news.ycombinator.com/item?id=${item.objectID}`}>
                <h3>{item.title}</h3>
              </a>
              {item.url && (
                <a href={item.url} className="story-link">
                  ({item.url})
                </a>
              )}
            </div>

            <p className="meta">
              {item.points} points | {item.author} |{" "}
              {formatDistanceToNow(item.created_at)} ago | {item.num_comments}{" "}
              comments
            </p>
            {item.story_text && (
              <p
                className="story-text"
                dangerouslySetInnerHTML={{ __html: item.story_text }}
              ></p>
            )}
          </div>
        ) : (
          <div key={item.objectID} className="list-item">
            <div className="title-container">
              <p className="meta">
                {item.author} | {formatDistanceToNow(item.created_at)} ago |{" "}
                <a
                  href={`https://news.ycombinator.com/item?id=${item.objectID}`}
                >
                  comment
                </a>{" "}
                |{" "}
                <a
                  href={`https://news.ycombinator.com/item?id=${item.parent_id}`}
                >
                  parent
                </a>{" "}
                | on :{" "}
                <a
                  href={`https://news.ycombinator.com/item?id=${item.story_id}`}
                >
                  {item.story_title}
                </a>
                <br />
                {item.story_url ? (
                  <a href={item.story_url}>({item.story_url})</a>
                ) : (
                  item.story_title
                )}
              </p>
              <p
                className="story-text"
                dangerouslySetInnerHTML={{ __html: item.comment_text }}
              ></p>
              {item.url && (
                <a href={item.url} className="story-link">
                  ({item.url})
                </a>
              )}
            </div>

            {item.story_text && (
              <p
                className="story-text"
                dangerouslySetInnerHTML={{ __html: item.story_text }}
              ></p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default List;
