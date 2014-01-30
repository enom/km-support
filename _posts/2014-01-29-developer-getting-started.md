---
layout: post
title: Developer's Introduction to KISSmetrics Objects
portal: developer
summary: A technical introduction to KISSmetrics.
permalink: /developers/
---
* Table of Contents
{:toc}
* * *

All the data in KISSmetrics is in the form of **events**, **properties**, and **people**. In short, these indicate what your users do, ways to group similar users together, and who they are.

![Simple API][simple-api]

# Events

People interact with your site or application. Think of **events** as the *actions* your users do. For example:

* Started a browsing session (`Visited Site`)
* `Saw homepage`
* `Saw landing page`
* `Downloaded app`
* `Subscribed to newsletter`
* `Opened Email`
* `Signed up`
* `Shared content` (on Twitter or Facebook, for example)
* `Billed` or `Purchased` (ie. paid you)

These *actions* aren't limited to just visiting a particular URL. The event might happen on one of your servers, or even happen offline (the customer responds to your sales person's phone call, for example). To handle such a variety of actions, KISSmetrics provides many libraries to record data, online and offline.

Our [Best Practices][best-practices] are a great start to introduce you to important events to record. We have guides for SaaS and e-commerce businesses.

## Event Tips

* Please keep event names under 255 characters. Commas (`,`), and colons (`:`) will be changed to spaces, so an event "`foo:bar,baz`" will be saved as "`foo bar baz`".
* Event names are not case sensitive, so `Signed Up` and `signed up` will be treated as the same event.
* A KISSmetrics account is most manageable when there are less than 3000 event types. Rather than using a variable in the names of new events, consider ways to aggregate similar events together using properties (described next).
* For each person, we save the last 1000 instances of each event. For example, if you have an event for `Viewed Homepage`, we'll remember the most recent 1000 times that each person `Viewed Homepage`.

# Properties

***Properties*** indicate additional information about each person. Primarily, properties let you segment similar people into groups (using the "**values**" of a property) based on one criteria (this is the "**property**" itself). Here are some example properties, with their corresponding values:

* Gender (example values could be "`Male`" or "`Female`")
* Which referral website URL brought the person to your site? (An example value is "`http://www.google.com`")
* Is this a returning visitor? (eg. "`Yes`" or "`No`")
* Which A/B test variation did they see? (eg. "`Original`", "`June 2 variation`" or "`August variation`")
* Which plan did they signed up for? (eg. "`Enterprise`", "`Premium`" or "`Free`")

Properties can be numeric too:

* Amount of revenue gained from a transaction (eg. "`49.99`" or "`-10.50`" for a refund)
* Age (eg. "`21`")

Numeric properties are special, because our reports can do some math in finding sums, averages, mins, and maxes. For example, for a numeric `Revenue` property, you'd be able to:

* Find the total revenue, across all transactions and all people
* Find the average transaction size, or the smallest/min, or the largest/max.
* Find the average net revenue per person (sum up the revenue per person and take the average across all people)

KISSmetrics saves all the values of each property; nothing is ever "overwritten". This lets you toggle [report options][prop-options] to show the First Value or Last Value set, and with the [Power Report][power-report], even show Every Value ever set across many people at a time.

## Properties Are Saved to Each Person

Whether you record properties as part of an event or set them individually, KISSmetrics remembers the property ***as being associated with the person***. This lets you use properties to segment reports in ways you may not have expected.

For example, you can look at the correlation between last month's A/B test and the number of upgrades this month. Most other analytics solutions would require you to re-record the A/B test property when the Upgrade occurs.

Again, our [Best Practices][best-practices] are a great start to introduce you to important properties to record. We have guides for SaaS and e-commerce businesses.

## Property Tips

* Please keep property names under 255 characters. Commas (`,`), and colons (`:`) will be changed to spaces, so an event "`foo:bar,baz`" will be saved as "`foo bar baz`".
* Property names are not case sensitive, so `Plan Type` and `Plan type` will be treated as the same property. That said, properties that share the same name will be aggregated. For example, if the `Amount` property is set alongside three different events, it will all contribute to the same `Amount` property.
* However, the values of those properties *are* case sensitive. So for a scenario like: `Plan Type:Gold` and `Plan Type:gold`, we'll see two different plan type values - "Gold" and "gold".
* A KISSmetrics account is most manageable when there are less than 3,000 property *names*. For example, `URL` and `Referrer` would be 2 of your 3,000 properties. We can still record whether millions of people receive these properties.
* The values of properties can be text or numbers (8 KB of data, in theory). We can't yet support JSON-structured values.
* For currency or other numeric properties, please do not include any symbols or units. KISSmetrics will not be able to do math operations when the values are like `"100 USD"`. Record just the numeric value (so just `100` or `"100"`).

## Reserved Property Names

Generally, you can name your properties whatever you like, as long as it is meaningful to you. However, **please do not** name your properties with an underscore and another letter, like `_a`, `_A`, `_t`, `_d`, etc. These are reserved for our API for special purposes.

# People

The core unit in KISSmetrics is a person, and we really do mean a ***person*** -- a human being, not a unique visit or a session. You may often be looking at aggregate reports of user behavior, but at the end of the day, it's possible to see data for each individual person.

People are represented by "**identities**", usually more than one. There are two types:

* ***Named Identities***: a *recognizable* word or phrase that represents a person:
  * `foo@example.com`
  * `User #12345`
  * `Facebook ID #67890`
* ***Anonymous Identities***: a *randomly-generated* string that represents a person before you know who they are:
  * `y75Fe33597qBqkR4obZZYV+wF3Y=`
  * `6j1KH1zrwBS6T2iIsixvpfnCnxY=`

In each account is a special KISSmetrics property named "**Customer ID**", whose values are each person's identities.

Here's a visual representation of 3 people within our data model:

    KM Person 1
    └── [KISSmetrics Property]: "Customer ID"
        └── [Anonymous ID]: 'y75Fe33597qBqkR4obZZYV+wF3Y='

    KM Person 2
    └── [KM Property]: "Customer ID"
        └── [Anonymous ID]: '6j1KH1zrwBS6T2iIsixvpfnCnxY='

    KM Person 3
    └── [KM Property]: "Customer ID"
        └── [Named ID]: 'User #12345'

To further demonstrate, here's a screenshot of one of our reports that is segmented by **Customer ID**. This particular example shows how often these 4 customers submitted a support request:

![Segmentation Example][segmentation-example]

## Use the Named ID You Have Access To

Ideally, each customer is represented by only **one** Named ID. Whatever type of ID you use depends on the information your app/website collects. The most common Named IDs are:

* **Account ID**: useful if people sign up for your service and log in.
* **Email Address**: useful if people subscribe to mailing lists.

If your team wants to run reports like the one above and have the choice to switch between Emails or Account IDs, you can store "secondary" identities as additional KISSmetrics properties:

    KM Person
    ├── [KM Property]: "Customer ID"
    |   └── 'User #12345' (Named ID)
    ├── [KM Property]: "Email Address"
    |   └── 'foo@example.com' (Secondary Named ID)
    └── [KM Property]: "Full Name"
        └── 'Pat Jones' (Additional metadata)

Be aware that *First Name/Last Name* and *IP Addressses* are not considered strong enough identifiers to distinguish one person from another. However, you can still save this type of metadata as KISSmetrics Properties.

## An ID Should Not Change Often, But When It Does…

Your customers can accumulate several identities over their lifetime of interaction with your application or website. They will initially visit anonymously, possibly from multiple web browsers. On each of those browsers, they will be first represented using Anonymous ID's. Once they sign up or log in, you can continue to track their activity under their Named ID, which is much more meaningful.

    KM Person
    └── [KISSmetrics Property]: "Customer ID"
        ├── [Anonymous ID #1]: 'rAy2wPD+HQeNkxP4eQNAIzMi/7s='
        ├── [Anonymous ID #2]: '8Kb8K7HSBfImcisqIGI4F1+t3tE='
        └── [Named ID]: 'User #12345'

Thus, a person should have no more than one Named ID, but can have several Anonymous IDs. Regardless of how many IDs a person accumulates, make sure they all refer back to the same KM Person object.

The next section regarding our API describes the `identify` and `alias` methods used to achieve this.

[simple-api]: https://s3.amazonaws.com/kissmetrics-support-files/assets/getting-started/simple-api.png

[best-practices]: /best-practices
[prop-options]: /advanced/advanced-properties
[power-report]: /tools/power-report
[data-ways]: /getting-started/ways-to-send-us-data

[pep]: /getting-started/people-events-properties
[common-methods]: /apis/common-methods
[js-ids]: /apis/javascript/javascript-identities.html

[mult-domains]: /apis/javascript/tracking-multiple-domains

[js-ids-info]: https://s3.amazonaws.com/kissmetrics-support-files/assets/getting-started/understanding-identities/js-ids.pdf

[segmentation-example]: http://f.cl.ly/items/0r3i2Q2D2F0U1f1i0l2J/segmentation.png

[too-many-events]: /troubleshooting/too-many-event-names
[data-type]: https://app.kissmetrics.com/product.edit
[site-settings]: https://app.kissmetrics.com/settings