import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryList = ({ data }) => (
  <div 
    className="invisible-scrollbar is-flex" 
    style={{overflowX:'auto'}}>
    {data.map(e => (
      <Link 
        key={e.id} 
        className="tag ml-4"
        to={`/category/${e.id}`}>
        {e.snippet.title}
      </Link>
    ))}
  </div>
);

const Categories = ({ categories, dispatch }) => {
  return <CategoryList data={categories}/>
}

const areEqual = (prevProps, nextProps) => {
  if (prevProps.categories.length !== nextProps.categories.length) {
    return false;
  }
  
  return true;
}

const MemoizedCategories = React.memo(Categories, areEqual);

const mapStateToProps = (state) => {
  const { categories, categoryList } = state;
  const data = []
  
  categoryList.ids.forEach(id => {
    if (categories[id]) {
      data.push(categories[id]);
    }
  });
  
  return {
    categories: data,
    isReqGet: categoryList.isReqGet
  }
}

export default connect(mapStateToProps)(MemoizedCategories);
