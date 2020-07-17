import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchCategoryList } from './store/actions/category-list.action';

const InitialProps = ({ categories, dispatch, children }) => {
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategoryList());
    }
  });
  
  if (categories.length === 0) {
    return (
      <div 
        className="columns is-centered is-vcentered is-mobile" 
        style={{minHeight:'100vh'}}>
        
        <div className="column is-narrow">
          <Loader type="Bars" color="#363636" height={80} width={80} />
        </div>
        
      </div>
    );
  }
  
  return <>{children}</>
}

const areEqual = (prevProps, nextProps) => {
  if (prevProps.categories.length !== nextProps.categories.length) {
    return false;
  }
  
  return true;
}

const MemoizedInitialProps = React.memo(InitialProps, areEqual);

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
  }
}

export default connect(mapStateToProps)(MemoizedInitialProps);
