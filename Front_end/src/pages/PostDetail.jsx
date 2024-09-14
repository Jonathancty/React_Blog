import React from "react";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail1 from "../images/blog1.jpg";

const PostDetail = () => {
  return (
    <section className="flex justify-center py-8 px-4 bg-gray-100">
      <div className="w-3/4 bg-white p-6 rounded-md shadow-md">
        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <PostAuthor />
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to={`/posts/werwer/edit`}
              className="inline-block px-4 py-2 text-sm font-semibold text-white rounded bg-blue-500 hover:bg-blue-700 transition duration-300 "
            >
              Edit Post
            </Link>
            <Link
              to={`/posts/werwer/delete`}
              className="inline-block px-4 py-2 text-sm font-semibold text-white rounded bg-red-500 hover:bg-red-700 transition duration-300 "
            >
              {" "}
              Delete Post
            </Link>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 font-playfair">
          {" "}
          This is the header
        </h1>
        <div>
          <img
            src={Thumbnail1}
            alt=""
            className="w-full max-w-2xl h-auto max-h-96 rounded-md shadow-md mx-auto my-8"
          />
        </div>
        <p className="text-gray-700 mb-4">
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Necessitatibus quas aperiam iste veritatis? Perspiciatis, autem. Ab
          molestiae molestias quisquam inventore officiis illo magnam dolorem
          excepturi ullam cumque temporibus nulla, distinctio totam laudantium
          autem sint eligendi maxime dolores, doloremque dignissimos atque.
        </p>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque animi
          sapiente, omnis voluptatem rerum facere eum quas itaque ut. Provident
          ut quidem magnam quaerat sint nam officiis animi, ad in placeat,
          praesentium velit incidunt mollitia minima. In, tempora id. Sed earum
          officiis quisquam eaque et. Doloremque aliquid, quos ab deserunt
          pariatur possimus neque similique blanditiis?
        </p>
        <p className="text-gray-700 mb-4">
          {" "}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
          accusantium ea dignissimos, aperiam ab id eligendi tempore sit iusto
          nesciunt nulla, reprehenderit repellendus iure? Tempora, minima
          numquam quaerat itaque voluptatibus similique unde voluptatum rerum!
        </p>
        <p className="text-gray-700 mb-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
          maiores fuga nulla eveniet quaerat quidem officiis veritatis ad qui
          aut tenetur vero, consectetur itaque vel cumque exercitationem! Sint,
          sunt iusto suscipit dignissimos officiis error debitis enim voluptates
          necessitatibus, deleniti corrupti, placeat provident quia nulla
          quisquam voluptatem! Perspiciatis veniam dignissimos impedit
          repudiandae consequatur voluptates obcaecati, beatae delectus quasi
          aspernatur, culpa quae quidem nam dolor ipsam modi architecto error
          aliquid.
        </p>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          totam ab quisquam explicabo veritatis natus alias ad incidunt sunt
          corrupti quam ullam ut reiciendis corporis, perferendis dolorem
          officiis blanditiis hic. Dolore dignissimos saepe odit, itaque aliquam
          animi quibusdam quos iusto sequi ipsa dolorem velit aliquid, ab
          voluptatem, quo harum repellat repudiandae magni. Repellat libero
          excepturi debitis officia qui rerum veniam nulla. Possimus iste
          numquam maxime officiis unde mollitia expedita vel pariatur, veniam
          nostrum tenetur corporis veritatis eligendi repudiandae atque eos
          inventore consectetur quibusdam sequi aperiam? Iusto vero laudantium
          iste adipisci vel dolorem in distinctio velit illum, explicabo, quod
          libero impedit unde obcaecati, quam nulla? Aliquam in nostrum
          molestiae earum, a fuga.
        </p>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          quam, autem minima, maiores beatae, vero labore eaque suscipit at
          atque provident voluptatibus. Exercitationem corporis quia vitae
          minima, vel accusamus odit reprehenderit nam cupiditate in
          perferendis, vero voluptate ab ullam non minus mollitia laudantium
          dicta. Deleniti amet, quibusdam necessitatibus sunt repellat
          reiciendis nostrum minus fugiat officiis dolores quis voluptatum
          expedita quod, eveniet facere autem nesciunt qui a sint asperiores
          porro voluptas aut doloremque nemo. Quae sint tenetur totam nulla, ea
          similique pariatur recusandae, incidunt sed dignissimos tempora
          tempore fugiat quasi atque doloremque molestias repellendus est
          praesentium, unde architecto rerum corporis iure culpa. Libero beatae
          pariatur saepe minus officiis, perferendis quos non. Iste quos
          consectetur voluptates exercitationem libero inventore non obcaecati
          odio temporibus aspernatur omnis iusto quod corrupti quaerat minus at
          aliquam doloribus consequatur sapiente, quam, expedita dolorem! Fugiat
          beatae alias quaerat quisquam, repellat deleniti. Earum, vel. Aut
          facilis et odit optio vel, eaque nisi debitis itaque quasi laboriosam
          magni ad molestias distinctio consectetur sit voluptate porro
          doloremque veritatis architecto! Ducimus, error non sint dolorem earum
          tenetur esse dolores adipisci saepe, officia quas deserunt blanditiis
          id autem cupiditate nam sit excepturi modi, beatae voluptas
          perspiciatis nobis fuga! Natus ullam modi architecto qui?
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
