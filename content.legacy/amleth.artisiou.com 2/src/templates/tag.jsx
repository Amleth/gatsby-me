import { graphql } from 'gatsby'
import Link from 'gatsby-link';
import lodash from 'lodash';
import React from 'react';

import Layout from '../components/layout'

export default ({ pathContext, data }) => {
	const { tag } = pathContext;
	const edges = data.allContent.edges;
	const totalCount = data.allContent ? data.allContent.totalCount : 0;
	const tagHeader = `${totalCount} item${
		totalCount === 1 ? '' : 's'
		} tagged with « ${tag} »`;

	return (
		<Layout>
			<div>
				<h1>{tagHeader}</h1>
				<ul>
					{edges.map(({ node }) => {
						const { chemin, tags, title } = node;
						const otherTags = lodash.sortBy(tags.filter(_ => _ !== tag));
						return (
							<li key={chemin} className="item-in-listing">
								<Link to={`/${chemin}`}>{title}</Link>
								{otherTags && (
									<div className="otherTags">
										<span className="info"> also tagged with: </span>
										{otherTags.length > 0 ? (
											otherTags.map(_ => {
												return (
													<span key={_}>
														<Link to={`tag/${lodash.kebabCase(_)}`}>{_}</Link>
														{_ !== otherTags[otherTags.length - 1] && ', '}
													</span>
												);
											})
										) : (
												<span className="info">&nbsp;—</span>
											)}
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</Layout>
	);
};

export const pageQuery = graphql`
	query TagPage($tag: String) {
		allContent(filter: { tags: { in: [$tag] } }) {
			totalCount
			edges {
				node {
					chemin
					tags
					title
				}
			}
		}
	}
`;
