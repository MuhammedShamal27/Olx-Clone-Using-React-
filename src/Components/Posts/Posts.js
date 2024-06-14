import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Posts.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [visibleQuickMenuProducts, setVisibleQuickMenuProducts] = useState(5); // Initial number of Quick Menu products to display
  const [visibleRecommendationsProducts, setVisibleRecommendationsProducts] = useState(5); // Initial number of Recommendations products to display
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id,
        };
      });
      setProducts(allPost);
    });
  }, [firebase]);

  const handleLoadMoreQuickMenu = () => {
    setVisibleQuickMenuProducts(prevVisibleProducts => prevVisibleProducts + 10);
  };

  const handleLoadMoreRecommendations = () => {
    setVisibleRecommendationsProducts(prevVisibleProducts => prevVisibleProducts + 5);
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
        </div>
        <div className="cards">
          {products.slice(0, visibleQuickMenuProducts).map((product, index) => (
            <div
              key={index}
              className="card"
              onClick={() => {
                setPostDetails(product);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
        {visibleQuickMenuProducts < products.length && (
          <div className="viewMore">
            <button onClick={handleLoadMoreQuickMenu}>Load More</button>
          </div>
        )}
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.slice(0, visibleRecommendationsProducts).map((product, index) => (
            <div
              key={index}
              className="card"
              onClick={() => {
                setPostDetails(product);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
        {visibleRecommendationsProducts < products.length && (
          <div className="viewMore">
            <button onClick={handleLoadMoreRecommendations}>Load More</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
