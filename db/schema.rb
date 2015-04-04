# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141011203436) do

  create_table "bullets", force: true do |t|
    t.string   "bullet_type"
    t.text     "description"
    t.integer  "checked",     default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "entry_id"
    t.integer  "position"
  end

  create_table "entries", force: true do |t|
    t.integer  "journal_id"
    t.integer  "day"
    t.integer  "month"
    t.integer  "year"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "day_name"
    t.string   "month_name"
  end

  create_table "journals", force: true do |t|
    t.integer  "user_id"
    t.string   "permalink"
    t.boolean  "visible",    default: true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "user_name",       limit: 25
    t.string   "email",                      default: "", null: false
    t.string   "password_digest"
    t.string   "string"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
