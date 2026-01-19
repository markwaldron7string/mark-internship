import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel"; 
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        const data = await response.json();
        console.log(data); 
        setCollections(data); 
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" items={4} nav={true} dots={false}>
            {loading ? (
              new Array(6).fill(0).map((_, index) => (
                <div className="item" key={index}>
                  <Skeleton width="100%" height="200px" borderRadius="10px" />
                </div>
              ))
            ) : (
              collections.slice(0, 6).map((collection) => (
                <div className="item" key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
