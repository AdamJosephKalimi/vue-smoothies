<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2>Edit {{smoothie.title}} Smoothie</h2>
        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>

            <!-- Displays the chips of previously added ingredients -->
            <!-- <ul class="ingredients">
                <li v-for="(ingredient, index) in ingredients" :key="index">
                    <span class="chip item-align">{{ ingredient }}
                        <i class="material-icons clear" @click="deleteIngredient(ingredient)">clear</i>
                    </span>
                </li>
            </ul> -->

            <!-- Shows the inputs of previously added ingredients -->
            <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
            </div>


            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
            </div>
            <div class="field center-align">
                <button class="btn pink"> Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        EditSmoothie() {
            // console.log(this.smoothie.title, this.smoothie.ingredients)
            if(this.smoothie.title) {
                this.feedback = null
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                }),
                // console.log(this.slug)
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })

            } else {
                this.feedback = 'You must enter a title'
            }
        },
        addIngredient() {
            if (this.another) {
                this.smoothie.ingredients.push(this.another)
                console.log(this.ingredients)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'Please enter an ingredient to be added'
            }
        },
        deleteIngredient(ing) {
            // console.log("Clear Ingredient", ingredient)
            this.smoothie.ingredients = this.smoothie.ingredients.filter( ingredient => {
                return ingredient !== ing
            })
        },
    },

    created() {
        // we use the "where()" bc we do not have the document ID when entering this page (can't use doc(id)).
        let ref = db.collection('smoothies').where( 'slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log("Doc data", doc.data())
                this.smoothie = doc.data()
                // The id is on the doc, not on the data
                this.smoothie.id = doc.id
            });
        })
    }
}

</script>

<style>
   .edit-smoothie {
        padding: 20px;
        max-width: 500px;
        margin-top: 60px;
    }

    .edit-smoothie h2 {
        margin: 20px auto;
        font-size: 2em;
    }

    .edit-smoothie .field {
        margin: 20px auto;
        position: relative;
    }

    .ingredients li {
        display: inline-block;
    }

    .ingredients .clear {
        cursor: pointer;
        font-size: 1em;
        margin-left: 5px;
    }

    .ingredients .item-align {
        display: flex; 
        align-items: center;        
        flex-direction: row; 
    }

    .edit-smoothie .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        cursor: pointer;
        font-size: 1.4em;
    }
</style>

