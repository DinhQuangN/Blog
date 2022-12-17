import React from 'react';
import { useLocation } from 'react-router-dom';
import DisplayBlog from '../../components/Posts/DisplayBlog';
import { getAPI } from '../../utils/Request';
import { IBlog } from '../../utils/TypeScript';

const Detail: React.FC = () => {
	const [blog, setBlog] = React.useState<IBlog>();
	const { state } = useLocation();
	React.useLayoutEffect(() => {
		if (!state.id) return;
		getAPI(`getBlog/${state.id}`).then(res => setBlog(res.data[0]));
		return () => setBlog(undefined);
	}, [state.id]);
	return <div className="flex">{blog && <DisplayBlog blog={blog} />}</div>;
};

export default Detail;
