import React, { Component } from "react";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from "./NewsItem";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
    pageSize: "4",
  };

  static propTypes = {
    country: propTypes.string,
    category: propTypes.string,
    pageSize: propTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      pageNumber: 1
    };
    document.title = `Newsify - ${this.props.category}` 
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.pageNumber}&apiKey=${this.props.apiKey}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults
    });
    this.props.setProgress(100);
   
  }

  handleNextClick = () => {
    this.setState({ loading: true, pageNumber: this.state.pageNumber + 1 });
    this.updateNews();
  };

  handlePrevClick = () => {
    this.setState({ loading: true, pageNumber: this.state.pageNumber - 1 });
    this.updateNews();
  };

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async() =>{
   
    this.setState({pageNumber: this.state.pageNumber + 1});
    console.log("after fetchmoredata" + this.state.pageNumber);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.pageNumber+1}&apiKey=${this.props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      totalResults: parsedData.totalResults,
    });
  }

  render() {
    return (
      <>
      
        <h1 className="text-align-center" style={{margin: '25px', marginTop : '75px'}}>Newsify - Top {this.props.category} headlines </h1>
        {/* {this.state.loading ? <Spinner /> : ""} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.props.totalResults}
          loader={ <h4>Loading...</h4>  }
          >
            <div className="container">
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4 ">
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    time={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
      </InfiniteScroll>

        {/* <div className="d-flex justify-content-between">
          <button
            id="prev1"
            disabled={this.state.pageNumber <= 1 ? true : false}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; previous
          </button>
          <button
            id="next1"
            disabled={
              this.state.pageNumber + 1 >
              Math.ceil(this.state.totalResults / 20)
                ? true
                : false
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            next &raquo;
          </button>
        </div> */}
      </>
    );
  }
}
