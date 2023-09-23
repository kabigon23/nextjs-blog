import { fetchBooks } from '../../lib/fetchBooks';
import Layout from '../../components/layout';
import BookThumbnail from '../../components/bookpage/bookthumbnail';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export default function Books({ books }) {
    return (
        <Layout>
            <Head>
                <title>국밥의 서재</title>
            </Head>
            <section className={`${utilStyles.booksSection}`}>
                {books.map((book) => (
                    <li style={{ listStyleType: 'none' }} className={`${utilStyles.listItem} ${utilStyles.fadeInEffect}`} key={book.isbn}>
                        <BookThumbnail
                            key={book.isbn}
                            title={book.title}
                            image={book.image}
                            author={book.author}
                            publisher={book.publisher}
                        />
                    </li>
                ))}

            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const books = fetchBooks();

    return {
        props: {
            books
        }
    };
}