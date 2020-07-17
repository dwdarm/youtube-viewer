import React from 'react';
import { connect } from 'react-redux';

const CategoryTitle = ({ category, dispatch }) => {
  if (!category) {
    return null;
  }
  return (
    <h1 className="title is-5">{category.snippet.title}</h1>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { category: state.categories[ownProps.categoryId] }
}

export default connect(mapStateToProps)(CategoryTitle);
