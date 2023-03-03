import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState("top");

	const { data } = useGetCryptoNewsQuery({
		newsCategory: newsCategory,
		count: simplified ? 6 : 12,
	});
	const { data: cryptos } = useGetCryptosQuery(100);

	const demoImage =
		"https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

	if (!data) {
		return "Loading...";
	}

	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a Crypto"
						optionFilterProp="children"
						onChange={(value) => setNewsCategory(value)}
						filterOption={(input, option) =>
							option.children
								.toLowerCase()
								.indexOf(input.toLowerCase()) >= 0
						}>
						<Option value="Cryptocurrency">Cryptocurrencies</Option>

						{cryptos.data.coins.map((coin, i) => (
							<Option
								key={i}
								value={coin.name}>
								{coin.name}
							</Option>
						))}
					</Select>
				</Col>
			)}
			{data.map((news, i) => (
				<Col
					xs={24}
					sm={12}
					lg={8}
					key={i}>
					<Card
						hoverable
						className="news-card">
						<a
							href={news.url}
							ait="news"
							target="_blank"
							rel="noreferrer">
							<div className="news-image-container">
								<Title
									className="news-title"
									level={5}>
									{news.title}
								</Title>
								<img
									style={{
										maxWidth: "200px",
										maxHeight: "100px",
									}}
									src={news.image || demoImage}
									alt="crypto"
								/>
							</div>
							<p>
								{news.description > 100
									? `${news.description.substring(0, 100)}...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar src={news.provider || demoImage} />
								</div>
								<Text>
									{moment(news.date).startOf("ss").fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};
export default News;
