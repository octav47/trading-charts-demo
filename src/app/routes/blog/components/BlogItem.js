import React from 'react'
import { Link } from 'react-router'

const BlogItem = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <img
                    src="https://cdn-images-1.medium.com/max/1600/1*arw-xygjM7ffyqw0ltdb1w.png"
                    className="img-responsive"
                    alt="assets/img" />
                <ul className="list-inline padding-10" />
            </div>
            <div className="col-md-8 padding-left-0">
                <h3 className="margin-top-0">
                    <a>
                        Немного о App Radio Hustle
                    </a>
                    <br />
                    <small className="font-xs"><i>запостил <a
                        href="http://vk.com/octav"
                        target="_blank">Кир Трибунский</a></i></small>
                </h3>
                <blockquote>
                    Зачем новый RH? Хорошо же всё работает
                    <br />
                    В смысле приложение? А почему тогда в браузере надо открывать, а не скачивать?
                    <br />
                    И чем App лучше?
                    <small>Пользователи Radio Hustle</small>
                </blockquote>
                На эти и другие вопросы я постараюсь дать ответы под катом,
                избегая прогерских терминов и малопонятных слов.
                <br />
                <br />
                <Link
                    to="/blog/about"
                    className="btn btn-default">
                    Читать далее
                </Link>
            </div>
        </div>
    )
}

export default BlogItem
