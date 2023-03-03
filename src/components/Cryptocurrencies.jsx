import React, { useState, useEffect, Fragment } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState(data?.data?.coins);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const filteredData = data?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		setCryptos(filteredData);
	}, [data, searchTerm]);

	if (isFetching) {
		return "Loading...";
	}

	return (
		<Fragment>
			{!simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search crypto currency"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}
			<Row
				gutter={[32, 32]}
				className="crypto-card-container">
				{cryptos?.map((crypto, i) => (
					<Col
						xs={24}
						sm={12}
						lg={6}
						className="crypto-card"
						key={i}>
						<Link to={`/crypto/${crypto.rank}`}>
							<Card
								title={`${crypto.rank} ${crypto.name}`}
								extra={
									<img
										className="crypto-image"
										src={crypto.iconUrl}
										alt="crypto"
									/>
								}
								hoverable>
								<p>Price: {millify(crypto.price)}</p>
								<p>Market Cap: {millify(crypto.marketCap)}</p>
								<p>Daily Change: {millify(crypto.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>{" "}
		</Fragment>
	);
};

export default Cryptocurrencies;
