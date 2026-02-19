# SwiftCart E-Commerce — JavaScript Q&A

1. What is the difference between null and undefined?
   উত্তর: undefined মানে হলো কোনো ভ্যারিয়েবলে মান সেট করা হয়নি। আর null মানে হলো ডেভেলপার ইচ্ছাকৃতভাবে ভ্যারিয়েবলটি খালি রেখেছে। undefined একটি টাইপ, কিন্তু null একটি অবজেক্ট।

2. What is the use of the map() function in JavaScript? How is it different from forEach()?
   উত্তর: map() একটি অ্যারের প্রতিটি উপাদানের ওপর ফাংশন চালিয়ে একটি নতুন অ্যারে তৈরি করে। অন্যদিকে forEach() শুধু লুপ চালায় কিন্তু কোনো কিছু রিটার্ন করে না।

3. What is the difference between == and ===?
   উত্তর: == শুধু মান (value) চেক করে এবং প্রয়োজনে টাইপ কনভার্ট করে। আর === মান এবং টাইপ (type) দুটোই চেক করে, কোনো কনভারশন করে না।

4. What is the significance of async/await in fetching API data?
   উত্তর: async/await ব্যবহার করলে অ্যাসিঙ্ক্রোনাস কোড সিঙ্ক্রোনাস কোডের মতো সহজে পড়া ও বোঝা যায়। এটি .then() চেইনিং এড়িয়ে কোডকে ক্লিন রাখে এবং try/catch দিয়ে এরর হ্যান্ডলিং সহজ করে।

5. Explain the concept of Scope in JavaScript (Global, Function, Block).
   উত্তর:
   Global Scope: কোডের যেকোনো জায়গা থেকে অ্যাক্সেস করা যায়।
   Function Scope: ভ্যারিয়েবলটি শুধু ওই ফাংশনের ভেতরেই ব্যবহার করা যায় (যেমন var)।
   Block Scope: ভ্যারিয়েবলটি শুধু {} ব্লকের ভেতরেই কাজ করে (যেমন let, const)।
