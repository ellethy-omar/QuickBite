const Product = require('../../models/Product');
const { uploadBase64Image } = require('../../controllers/cloudinaryController');
const getRestaurantProducts = async (req, res) => {
    try {
        const products = await Product.find({ restaurantId: req.user._id });
        res.status(200).json({
            message:"products are in an array", 
            data: products
        });
        console.log('products:', products);
    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch products",
            details: err.message
        });
        console.log('Error fetching products:', err);
    }
};

const addRestaurantProduct = async (req, res) => {
    try {
        const { name, description, price, category, isAvailable, stockAvailable } = req.body;

        if (!name || !description || !price || !category || !isAvailable || !stockAvailable) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'Missing required fields' });
        }

        if(price <= 0) {
            console.log("Price must be a positive number");
            return res.status(403).json({ error: 'Price must be a positive number' });
        }

        if (stockAvailable <= 0) {
            console.log("Stock available must be a positive number");
            return res.status(403).json({ error: 'Stock available must be a positive number' });
        }
        
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            isAvailable,
            restaurantId: req.user._id,
            stockAvailable: Math.round(stockAvailable)
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        console.log('savedProduct:', savedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add product', details: err.message });
        console.log('Error adding product:', err);
    }
};

const editRestaurantProduct = async (req, res) => {
    try {
        const { _id, ...updates } = req.body;

        if(!updates) {
            console.log("No updates provided");
            return res.status(403).json({ error: 'No updates provided' });
        }
        if(!_id) {
            console.log("Product ID is required");
            return res.status(403).json({ error: 'Product ID is required' });
        }

        if (updates.price !== undefined) {
            if (updates.price <= 0) {
                console.log("Price must be a positive number");
                return res.status(403).json({ error: 'Price must be a positive number' });
            }
        }

        if (updates.stockAvailable !== undefined) {
            if (updates.stockAvailable <= 0) {
                console.log("stockAvailable must be a positive number");
                return res.status(403).json({ error: 'stockAvailable must be a positive number' });
            }
            updates.stockAvailable = Math.round(updates.stockAvailable);
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id, restaurantId: req.user._id },
            updates,
            { new: true }
        );

        if (!updatedProduct) {
            console.log("Product not found");
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
        console.log('updatedProduct:', updatedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Failed to edit product', details: err.message });
        console.log('Error editing product:', err);
    }
};

const editRestaurantProductImage = async (req, res) => {
    try {
        const { _id, imageBase64, tags } = req.body;

        if (!_id || !imageBase64 || !tags || !Array.isArray(tags) || tags.length === 0) {
            console.log("Missing required fields");
            return res.status(403).json({ error: 'Product ID, imageBase64, and tags are required.' });
        }

        const product = await Product.findOne({
            _id,
            restaurantId: req.user._id
          });
          

        if (!product) {
            console.log("Product not found");
            return res.status(404).json({ error: 'Product not found' });
        }

        const uploadResponse = await uploadBase64Image(imageBase64, tags);
        if (!uploadResponse || !uploadResponse.secure_url) {
            console.log("Image upload failed");
            return res.status(500).json({ error: 'Image upload failed.' });
        }

        product.image = uploadResponse.secure_url;
        await product.save();

        res.status(200).json({
            message: 'Image updated successfully',
            image: product.image,
        });
        console.log('image:', product.image);
    } catch (err) {
        console.log('Error updating product image:', err);
        res.status(500).json({ error: 'Failed to update product image', details: err.message });
    }
};


const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      console.log("Product ID is required");
      return res.status(403).json({ error: "Product ID is required" });
    }

    const deleted = await Product.findOneAndDelete({
      _id: productId,
      restaurantId: req.user._id
    });

    if (!deleted) {
      console.log("Product not found or not owned by restaurant");
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deleted
    });
    console.log("Deleted product:", deleted);

  } catch (err) {
    console.log("Error deleting product:", err);
    res.status(500).json({
      error: "Failed to delete product",
      details: err.message
    });
  }
};

module.exports = {
    getRestaurantProducts,
    addRestaurantProduct,
    editRestaurantProduct,
    editRestaurantProductImage,
    deleteProduct
}