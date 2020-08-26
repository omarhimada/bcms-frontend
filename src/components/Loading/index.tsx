import * as React from 'react';
import { Spin } from 'antd';

export default () => 
	<div className='loading-spinner'>
		<Spin size="large" tip="Loading..." />
	</div>;