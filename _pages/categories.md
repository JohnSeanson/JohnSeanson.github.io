---
layout: home
title: "Categories"
permalink: /categories/
---

<h1>Categories</h1>

<ul>
  {% assign categories = site.categories | sort %}
  {% for category in categories %}
    <li><a href="{{ '/categories/' | append: category[0] | relative_url }}">{{ category[0] }}</a> ({{ category[1].size }})</li>
  {% endfor %}
</ul>
