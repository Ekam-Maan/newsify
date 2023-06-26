import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let{title, description, imageUrl, url, author, time, source} = this.props;
    return (
        <div className="card my-2">
            <div className="container" style={{display: 'flex', position: 'absolute', justifyContent: 'flex-end', right: -10}}>
            <span className="badge rounded-pill bg-secondary">{source}</span>
            </div>
            <img src={imageUrl ? imageUrl : "https://www.shutterstock.com/shutterstock/photos/1538146961/display_1500/stock-vector-background-screen-saver-on-breaking-news-business-or-technology-news-background-1538146961.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title ? title : "Click on the read more to view full story"}</h5>
            <p className="card-text">{description ? description : "Click on the read more to view full story"}</p>
            <a href={url} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
            <p className="card-text"><small className="text-body-secondary">Author {author ? author : "Unkown"} on {new Date(time).toUTCString()}</small></p>
            </div>
      </div>  
    )
  }
}
