import db from "@/lib/db";
import React from "react";

async function getData() {
  const folders = await db.folder.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return folders;
}

const FilesPage = async () => {
  const data = await getData();
  console.log(data);
  return (
    <>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod et
        blanditiis a. Nobis dicta, velit laborum minus repudiandae itaque, quasi
        corrupti quisquam earum magni totam eligendi officiis aliquid
        perferendis? Natus iure eos inventore facere voluptatum in maxime
        ratione, molestias labore. Explicabo, iste! Illum facilis libero velit,
        accusantium vel consequuntur? Recusandae fugiat voluptates, deleniti
        doloribus beatae in, labore eligendi perferendis dolores unde earum
        facilis nobis, at expedita temporibus consectetur ea animi dignissimos
        tempore neque reiciendis. Molestiae alias, error ratione repudiandae
        tempora repellat odio nam similique explicabo modi possimus officiis
        dicta assumenda voluptatibus magnam doloribus consequuntur incidunt
        deleniti nulla. Eos, eius. Quasi cupiditate ratione quas, sunt optio
        maiores laudantium reiciendis, ab error ex quia nostrum inventore sit
        vitae sapiente natus quaerat nam accusamus quae quisquam delectus ut
        eaque omnis possimus. Eius cum modi voluptates quidem eaque iusto,
        consectetur architecto minima ipsa perferendis sit ipsam id beatae ea
        quibusdam accusantium itaque commodi fugit rem ipsum vitae. Temporibus,
        recusandae cumque. Porro expedita autem aut labore non? Repellat
        exercitationem officia autem doloremque perferendis voluptatem nemo
        impedit amet tenetur ipsa. Eum cupiditate alias minima iure animi
        officiis facilis, tenetur maiores enim maxime dolorum reiciendis aliquid
        quidem voluptatem dicta earum consequatur excepturi corporis eaque
        aperiam ex magnam accusamus! Vel exercitationem, ea et neque magnam
        deleniti quibusdam, autem culpa saepe alias consectetur voluptatibus
        laudantium praesentium enim. Ut laboriosam reiciendis asperiores fugit?
        Eum, nesciunt quibusdam ad reiciendis quam fugiat velit necessitatibus
        quaerat in, dolorum, praesentium officia eos et sint fugit eveniet
        perspiciatis? Numquam facilis necessitatibus fugiat optio aliquam
        obcaecati aperiam porro, eligendi distinctio officia earum perferendis
        laboriosam nam natus minus inventore aspernatur praesentium? Eos magni
        odio ratione dolorum obcaecati placeat repellendus delectus iusto fugit.
        Atque, aperiam nam? Similique aliquam sint recusandae suscipit, itaque,
        dolores reiciendis accusamus, architecto alias distinctio aperiam nam
        veniam aspernatur! Delectus architecto magnam eum. Earum, sunt!
      </div>
    </>
  );
};

export default FilesPage;
