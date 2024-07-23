const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html` <h3>Add a Page</h3>
    <form method="POST" action="/wiki">
      <div>
        <label for="name">Author Name</label>
        <input type="text" name="name" />
      </div>
      <div>
        <label for="email">Author Email</label>
        <input type="text" name="email" />
      </div>
      <div>
        <label for="title">Page Title</label>
        <input type="text" name="title" />
      </div>
      <div>
        <label for="content">Content</label>
        <input type="text" name="content" />
      </div>
      <div>
        <label for="status">Status</label>
        <select>
          <option value="open">open</option>
          <option value="closed">closed</option>
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>`);
