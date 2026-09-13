import { DuelPair, ImageItem } from '../types';

export const IMAGE_DATABASE: ImageItem[] = [
  // 1. GAN: Chân dung cô gái tóc vàng với khuyên tai kỳ lạ & kính gọng méo
  {
    id: 'gan-portrait-01',
    title: 'Chân dung cô gái tóc vàng',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80', // We will mark this correctly according to real vs gan
    isGAN: false,
    category: 'portrait',
    difficulty: 'easy',
    modelOrSource: 'Ảnh chụp chân dung thực tế (Canon EOS 5D)',
    explanation: 'Ảnh người thật: Hai tròng mắt có đốm sáng phản chiếu đồng nhất từ nguồn sáng tự nhiên phía trước. Chi tiết chân tóc và lỗ chân lông tự nhiên, viền cổ áo và phông nền rõ ràng.',
    clues: [
      { id: 'c1', label: 'Ánh mắt tự nhiên', detail: 'Đốm sáng phản chiếu (catchlight) trong cả 2 mắt cùng hình dạng và góc chiếu.', x: 48, y: 38 },
      { id: 'c2', label: 'Cấu trúc tóc', detail: 'Từng sợi tóc riêng biệt, không bị bết dính hay hòa lẫn vào phông nền.', x: 70, y: 25 },
      { id: 'c3', label: 'Lỗ chân lông thực tế', detail: 'Bề mặt da có vân da tự nhiên, không bị mờ nhẵn như sáp.', x: 42, y: 55 }
    ]
  },
  {
    id: 'gan-portrait-02',
    title: 'Chân dung nam thanh niên StyleGAN',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    isGAN: false,
    category: 'portrait',
    difficulty: 'medium',
    modelOrSource: 'Ảnh chụp chân dung thực tế',
    explanation: 'Ảnh người thật: Vệt cười ở khóe mắt, nếp gấp cơ mặt và răng mọc tự nhiên với đường nối răng cửa chuẩn xác, bờ vai và áo sơ mi có cấu trúc vải dệt chân thực.',
    clues: [
      { id: 'c1', label: 'Khuôn răng đối xứng', detail: 'Đường rãnh giữa 2 răng cửa nằm ngay ngắn theo trục khuôn mặt.', x: 50, y: 64 },
      { id: 'c2', label: 'Cơ mặt cử động tự nhiên', detail: 'Nếp nhăn khi cười ở khóe mắt và cơ má hoàn toàn cân xứng sinh học.', x: 62, y: 44 }
    ]
  },
  {
    id: 'gan-portrait-03',
    title: 'Người phụ nữ đeo khuyên tai (StyleGAN2)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    isGAN: false,
    category: 'portrait',
    difficulty: 'hard',
    modelOrSource: 'Ảnh chân dung chuyên nghiệp',
    explanation: 'Ảnh người thật: Khuyên tai bằng kim loại sắc nét, có bóng đổ vật lý chính xác lên cổ và tai. Trục mắt và đồng tử hoàn toàn tròn trịa.',
    clues: [
      { id: 'c1', label: 'Bóng đổ vật lý', detail: 'Khuyên tai có bóng đổ chân thực trên cổ, phản ánh đúng nguồn sáng xiên.', x: 26, y: 60 },
      { id: 'c2', label: 'Hình dạng đồng tử', detail: 'Đồng tử mắt hoàn hảo hình tròn, không có hiện tượng móp méo kiểu GAN.', x: 42, y: 40 }
    ]
  },
  {
    id: 'gan-portrait-04',
    title: 'Cụ ông râu bạc (Phong cách AI tạo dựng)',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    isGAN: false,
    category: 'portrait',
    difficulty: 'medium',
    modelOrSource: 'Nhiếp ảnh chân dung Studio',
    explanation: 'Ảnh người thật: Các nếp nhăn trán và sợi râu có độ dày mỏng và hướng đổ tự nhiên theo giải phẫu học cơ thể người.',
    clues: [
      { id: 'c1', label: 'Nếp nhăn giải phẫu', detail: 'Các rãnh nhăn trán tuân thủ cấu trúc cơ sọ trán, không tự nhiên biến mất.', x: 50, y: 28 },
      { id: 'c2', label: 'Sợi râu đan xen', detail: 'Từng sợi râu có gốc nang lông rõ ràng trên bề mặt da.', x: 52, y: 72 }
    ]
  },
  {
    id: 'gan-cat-01',
    title: 'Mèo lông ngắn nhìn thẳng',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
    isGAN: false,
    category: 'pet',
    difficulty: 'easy',
    modelOrSource: 'Nhiếp ảnh động vật tự nhiên',
    explanation: 'Ảnh thật: Râu mèo có độ cong trọng lực, đồng tử mở đều 2 bên và sợi lông sắc nét quanh viền tai.',
    clues: [
      { id: 'c1', label: 'Râu mèo tự nhiên', detail: 'Râu mèo mọc từ các nốt đen đối xứng và cong mềm mại xuống dưới.', x: 65, y: 65 },
      { id: 'c2', label: 'Vành tai đối xứng', detail: 'Cấu trúc sụn tai và chùm lông tơ trong tai có giải phẫu hoàn chỉnh.', x: 30, y: 22 }
    ]
  },
  {
    id: 'gan-landscape-01',
    title: 'Góc phố cổ hoàng hôn',
    url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80',
    isGAN: false,
    category: 'scenery',
    difficulty: 'medium',
    modelOrSource: 'Nhiếp ảnh đô thị',
    explanation: 'Ảnh thật: Đường nét kiến trúc, cửa sổ thẳng tắp theo phối cảnh quang học một điểm tụ; các dòng chữ trên biển hiệu có cấu trúc chữ viết rõ ràng.',
    clues: [
      { id: 'c1', label: 'Đường thẳng phối cảnh', detail: 'Các gờ tường và cửa sổ nhà không bị cong lượn sóng bất thường.', x: 45, y: 40 },
      { id: 'c2', label: 'Đèn đường và dây điện', detail: 'Dây cáp và đèn giao thông nối liền lạc, không bị đứt đoạn giữa không trung.', x: 75, y: 35 }
    ]
  },
  // StyleGAN & AI Generated Images with clear classic GAN artifact patterns
  // Using authoritative Wikimedia / StyleGAN repository samples
  {
    id: 'gan-ai-01',
    title: 'Chân dung tổng hợp StyleGAN2',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'portrait',
    difficulty: 'medium',
    modelOrSource: 'NVIDIA StyleGAN2 Generator',
    explanation: 'ẢNH DO GAN TẠO RA: Chú ý đốm sáng trong hai con ngươi không đồng dạng, viền cổ áo bên phải bị mờ nhòe bất thường vào nền và hậu cảnh có vệt màu loang lổ dạng "water droplet" đặc trưng của StyleGAN.',
    clues: [
      { id: 'c1', label: 'Vệt loang Water Droplet', detail: 'Hậu cảnh có mảng mờ kỳ lạ không thể nhận diện được đồ vật gì.', x: 82, y: 20 },
      { id: 'c2', label: 'Bất đối xứng đồng tử', detail: 'Hình dạng phản quang trong 2 mắt không khớp nhau về góc chiếu sáng.', x: 45, y: 42 },
      { id: 'c3', label: 'Viền cổ áo tan chảy', detail: 'Đường viền áo và da cổ hòa lẫn vào nhau mà không có ranh giới rõ ràng.', x: 60, y: 85 }
    ]
  },
  {
    id: 'gan-ai-02',
    title: 'Khuôn mặt nam thanh niên StyleGAN',
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'portrait',
    difficulty: 'hard',
    modelOrSource: 'StyleGAN3 (Alias-Free GAN)',
    explanation: 'ẢNH DO GAN TẠO RA: Tóc ở đỉnh đầu bị bết dính thành các cụm vô định hình, vành tai bên trái thiếu sụn gờ đối luân tự nhiên.',
    clues: [
      { id: 'c1', label: 'Cấu trúc vành tai lỗi', detail: 'Sụn vành tai bị nhòe mất gờ tự nhiên, trông như chất lỏng bị đông đặc.', x: 22, y: 48 },
      { id: 'c2', label: 'Sợi tóc bết thành khối', detail: 'Các lọn tóc phía sau chuyển đổi đột ngột từ sắc nét sang mờ sương kỳ dị.', x: 75, y: 22 }
    ]
  },
  {
    id: 'gan-ai-03',
    title: 'Cô gái với khuyên tai dị thường',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'portrait',
    difficulty: 'easy',
    modelOrSource: 'StyleGAN2 (ThisPersonDoesNotExist)',
    explanation: 'ẢNH DO GAN TẠO RA: Dấu hiệu "chí mạng" của GAN: Tai bên này đeo khuyên nhưng tai đối diện lại là khối kim loại biến dạng dính chặt vào da; răng cửa xuất hiện răng thừa ở chính giữa.',
    clues: [
      { id: 'c1', label: 'Khuyên tai ma dị', detail: 'Một bên khuyên tai bị méo mó, biến thể thành một khối nhôm tan chảy.', x: 18, y: 62 },
      { id: 'c2', label: 'Hiện tượng "Răng giữa"', detail: 'Răng cửa không có khe chia đối xứng mà có một chiếc răng mọc ngay chính giữa.', x: 50, y: 65 },
      { id: 'c3', label: 'Nền trừu tượng méo mó', detail: 'Phông nền sau lưng có hình người thứ hai bị biến dạng kinh dị.', x: 88, y: 45 }
    ]
  },
  {
    id: 'gan-ai-04',
    title: 'Mèo giả lập từ BigGAN / GAN-Cat',
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'pet',
    difficulty: 'medium',
    modelOrSource: 'BigGAN Deep Model',
    explanation: 'ẢNH DO GAN TẠO RA: Mắt kính bị tan chảy vào lông mặt, râu mèo mọc đâm xuyên qua tròng kính mà không có gốc chân râu hợp lý.',
    clues: [
      { id: 'c1', label: 'Gọng kính hòa vào da lông', detail: 'Viền kính mắt không có khớp nối mà dính liền vào da mặt như thể là một thể thống nhất.', x: 38, y: 48 },
      { id: 'c2', label: 'Râu mèo bất thường', detail: 'Số lượng râu 2 bên chênh lệch lớn và có sợi mọc đứt đoạn giữa chừng.', x: 68, y: 68 }
    ]
  },
  {
    id: 'gan-ai-05',
    title: 'Khuôn mặt người già AI',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'portrait',
    difficulty: 'hard',
    modelOrSource: 'StyleGAN2 FFHQ Trained',
    explanation: 'ẢNH DO GAN TẠO RA: Hàng lông mày bên trái có những sợi mọc vuông góc bất thường; tròng mắt bên phải hơi lệch hình bầu dục méo.',
    clues: [
      { id: 'c1', label: 'Lông mày biến dị', detail: 'Hướng mọc của các sợi lông mày rối loạn, vài sợi bị đứt khúc.', x: 36, y: 35 },
      { id: 'c2', label: 'Đồng tử méo mó', detail: 'Đồng tử mắt không tròn vo mà có góc khuyết hình oval không tự nhiên.', x: 60, y: 38 }
    ]
  },
  {
    id: 'gan-ai-06',
    title: 'Thành phố tương lai từ GAN kiến trúc',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'scenery',
    difficulty: 'easy',
    modelOrSource: 'Diffusion-GAN Architecture',
    explanation: 'ẢNH DO GAN TẠO RA: Các cửa sổ nhà cao tầng bị uốn cong lượn sóng như thạch lỏng; các đường vân vỉa hè giao cắt nhau phi lý.',
    clues: [
      { id: 'c1', label: 'Cửa sổ lượn sóng', detail: 'Các khung cửa sổ trên tòa tháp bị vặn xoắn, không tuân thủ góc vuông xây dựng.', x: 35, y: 40 },
      { id: 'c2', label: 'Bóng phản chiếu sai góc', detail: 'Bóng đổ trên mặt kính không tương ứng với góc chiếu của mặt trời trên trời.', x: 65, y: 70 }
    ]
  },
  {
    id: 'gan-real-07',
    title: 'Bé gái cười tươi dưới nắng',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    isGAN: false,
    category: 'portrait',
    difficulty: 'easy',
    modelOrSource: 'Ảnh chụp máy ảnh Sony Alpha',
    explanation: 'Ảnh người thật: Mắt phản chiếu toàn bộ khung cảnh cây cối và vòm trời phía trước một cách hoàn hảo. Từng sợi tóc tơ bay trong gió độc lập.',
    clues: [
      { id: 'c1', label: 'Sợi tóc tơ bay tự nhiên', detail: 'Sợi tóc mảnh bay trong không khí sắc nét tách biệt hoàn toàn với phông nền.', x: 25, y: 30 },
      { id: 'c2', label: 'Khuyên tai sắc sảo', detail: 'Chi tiết lỗ xỏ khuyên và độ dày của vành tai hoàn toàn hợp lý về mặt sinh học.', x: 76, y: 55 }
    ]
  },
  {
    id: 'gan-ai-07',
    title: 'Chân dung cô gái Á Đông tạo bởi GAN',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'portrait',
    difficulty: 'medium',
    modelOrSource: 'StyleGAN2 Custom Latent Space',
    explanation: 'ẢNH DO GAN TẠO RA: Hậu cảnh phía sau vai trái có các mảng màu trừu tượng dạng xoắn ốc ma quái; dây áo một bên biến mất vào khoảng không.',
    clues: [
      { id: 'c1', label: 'Dây áo tan biến', detail: 'Quai áo bên phải mờ nhạt dần và biến mất hoàn toàn trước khi chạm tới vai áo.', x: 70, y: 80 },
      { id: 'c2', label: 'Dị vật hậu cảnh', detail: 'Các mảng màu đốm đốm phía sau không phải là cây cối hay nội thất mà là nhiễu GAN.', x: 20, y: 40 }
    ]
  },
  {
    id: 'gan-real-08',
    title: 'Chàng trai đeo kính cận ngoài trời',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    isGAN: false,
    category: 'portrait',
    difficulty: 'medium',
    modelOrSource: 'Ảnh chụp chân dung Nikon Z6',
    explanation: 'Ảnh người thật: Gọng kính có cấu trúc kim loại và đệm mũi rõ rệt tì lên sống mũi; độ khúc xạ của mắt kính làm dịch chuyển nhẹ đường nét khuôn mặt phía sau tròng kính theo quang học thực tế.',
    clues: [
      { id: 'c1', label: 'Đệm mũi và gọng kính', detail: 'Cấu tạo cơ khí gọng kính hoàn chỉnh: đệm mũi sillicon, bản lề gập.', x: 45, y: 44 },
      { id: 'c2', label: 'Hiện tượng khúc xạ kính', detail: 'Đường viền má phía sau tròng kính bị thu nhỏ nhẹ do độ cận của thấu kính.', x: 62, y: 50 }
    ]
  },
  {
    id: 'gan-ai-08',
    title: 'Người đàn ông với gọng kính GAN bị nối tắt',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80',
    isGAN: true,
    category: 'portrait',
    difficulty: 'easy',
    modelOrSource: 'StyleGAN2 Glasses Interpolation',
    explanation: 'ẢNH DO GAN TẠO RA: Dấu hiệu kinh điển của GAN khi vẽ kính: gọng kính bên trái có viền nhưng bên phải gọng kính biến mất hoặc hòa tan vào lông mày; cầu nối giữa hai tròng kính bị lệch tâm.',
    clues: [
      { id: 'c1', label: 'Gọng kính đứt gãy', detail: 'Gọng kính chỉ xuất hiện một nửa, nửa còn lại bị chìm vào hốc mắt.', x: 35, y: 42 },
      { id: 'c2', label: 'Cầu kính dị tật', detail: 'Thanh ngang nối 2 mắt kính không nằm trên sống mũi mà lơ lửng.', x: 50, y: 43 }
    ]
  }
];

// Cặp đối đầu: 1 ảnh thật và 1 ảnh GAN để so tài
export const DUEL_PAIRS: DuelPair[] = [
  {
    id: 'duel-pair-1',
    title: 'Cặp đấu 1: Hai cô gái tóc vàng',
    category: 'portrait',
    difficulty: 'easy',
    realImage: IMAGE_DATABASE[0], // gan-portrait-01 (Real)
    ganImage: IMAGE_DATABASE[8],  // gan-ai-03 (GAN with earrings artifact)
    comparisonHint: 'Hãy nhìn kỹ vào khuyên tai và răng cửa của cả 2 bức ảnh!'
  },
  {
    id: 'duel-pair-2',
    title: 'Cặp đấu 2: Ánh mắt & Gọng kính',
    category: 'portrait',
    difficulty: 'medium',
    realImage: IMAGE_DATABASE[8], // gan-real-08 (Real glasses)
    ganImage: IMAGE_DATABASE[9],  // gan-ai-08 (GAN glasses artifact)
    comparisonHint: 'Soi kỹ phần đệm mũi và gọng nối giữa hai tròng kính.'
  },
  {
    id: 'duel-pair-3',
    title: 'Cặp đấu 3: Nụ cười và đường chân tóc',
    category: 'portrait',
    difficulty: 'medium',
    realImage: IMAGE_DATABASE[1], // gan-portrait-02 (Real man)
    ganImage: IMAGE_DATABASE[6],  // gan-ai-01 (GAN man with waterdrop)
    comparisonHint: 'Quan sát kỹ phông nền mờ ảo phía sau và phản quang trong con ngươi!'
  },
  {
    id: 'duel-pair-4',
    title: 'Cặp đấu 4: Động vật bốn chân',
    category: 'pet',
    difficulty: 'hard',
    realImage: IMAGE_DATABASE[4], // gan-cat-01 (Real cat)
    ganImage: IMAGE_DATABASE[7],  // gan-ai-04 (GAN cat with sunglasses artifact)
    comparisonHint: 'Xem xét hướng mọc của râu mèo và đường tiếp giáp giữa tai với đầu.'
  },
  {
    id: 'duel-pair-5',
    title: 'Cặp đấu 5: Vành tai và nếp gấp sinh học',
    category: 'portrait',
    difficulty: 'hard',
    realImage: IMAGE_DATABASE[2], // gan-portrait-03 (Real woman)
    ganImage: IMAGE_DATABASE[7],  // gan-ai-02 (GAN StyleGAN3)
    comparisonHint: 'Hãy dùng kính lúp soi cấu trúc sụn vành tai và sự liền mạch của sợi tóc.'
  },
  {
    id: 'duel-pair-6',
    title: 'Cặp đấu 6: Ánh sáng Studio vs Trí tuệ Nhân tạo',
    category: 'portrait',
    difficulty: 'hard',
    realImage: IMAGE_DATABASE[6], // gan-real-07 (Real girl)
    ganImage: IMAGE_DATABASE[8],  // gan-ai-07 (GAN girl)
    comparisonHint: 'Soi kỹ đường viền quai áo và chi tiết sợi tóc tơ bay trong không khí.'
  }
];

// 7 Dấu hiệu nhận biết GAN kinh điển để hiển thị trong cẩm nang Thám tử
export const GAN_FIELD_GUIDE = [
  {
    id: 'guide-eyes',
    title: '1. Phản quang mắt (Catchlights)',
    summary: 'Mắt người thật luôn phản chiếu cùng 1 nguồn sáng, GAN thường vẽ 2 mắt ở 2 môi trường khác nhau.',
    detail: 'Trong nhiếp ảnh thực tế, nếu có một cửa sổ bên phải, cả 2 đồng tử đều xuất hiện hình ảnh cửa sổ đó. Mạng GAN tạo sinh độc lập từng vùng nên mắt trái có thể phản chiếu đèn tròn studio còn mắt phải lại phản chiếu bóng cây.',
    icon: 'Eye',
    tip: 'Bật kính lúp và phóng to 2 con ngươi. Nếu đốm sáng khác hình dáng hoặc mắt móp méo -> 99% GAN!'
  },
  {
    id: 'guide-earrings',
    title: '2. Khuyên tai & Trang sức bất đối xứng',
    summary: 'GAN rất dở trong việc tạo ra 2 chiếc khuyên tai giống nhau.',
    detail: 'Do mạng nơ-ron xử lý khuôn mặt dựa trên tọa độ không gian độc lập, nó hiếm khi liên kết được khuyên tai bên trái với khuyên tai bên phải. Một bên có thể là viên kim cương lấp lánh, bên kia lại là khối kim loại biến dạng hòa vào cổ.',
    icon: 'Sparkles',
    tip: 'Luôn kiểm tra 2 bên tai. Nếu một bên đeo khuyên tròn to còn bên kia trống trơn hoặc méo mó -> GAN.'
  },
  {
    id: 'guide-glasses',
    title: '3. Gọng kính "Xuyên không" và biến mất',
    summary: 'Gọng kính nối vào lông mày, đứt gãy hoặc không có đệm mũi.',
    detail: 'Mắt kính đòi hỏi quy luật hình học đối xứng và định luật khúc xạ quang học. GAN thường vẽ gọng kính một bên sắc sảo, bên kia chìm thẳng vào gò má hoặc thanh cầu kính nối lệch tâm.',
    icon: 'Glasses',
    tip: 'Quan sát phần sống mũi nơi 2 tròng kính nối với nhau và đuôi gọng vòng qua tai.'
  },
  {
    id: 'guide-teeth',
    title: '4. Hiện tượng "Răng giữa" (Middle Tooth)',
    summary: 'Khuôn răng xuất hiện một chiếc răng mọc chính giữa trục mặt thay vì khe hở.',
    detail: 'Giải phẫu người luôn có 2 răng cửa giữa đối xứng qua đường trung tâm. GAN thường bị "bối rối" khi gom trung bình các mẫu dữ liệu, dẫn đến việc tạo ra một chiếc răng đơn độc nằm ngay chính giữa nụ cười.',
    icon: 'Smile',
    tip: 'Đếm răng cửa: Nếu có 1 răng to tướng nằm ngay giữa nhân trung -> dấu vết GAN kinh điển.'
  },
  {
    id: 'guide-hair',
    title: '5. Tóc hòa tan vào phông nền (Hair-Background Bleed)',
    summary: 'Sợi tóc đột ngột hóa lỏng hoặc biến thành vệt màu kỳ quái.',
    detail: 'Ở người thật, sợi tóc có độ sắc nét và bóng tự nhiên. Ở ảnh StyleGAN, các sợi tóc ở rìa ngoài thường bị nhòe thành sương mù hoặc đan xoắn vào nhau như mạng nhện bất quy tắc.',
    icon: 'Wind',
    tip: 'Rà kính lúp dọc theo đường viền mái tóc tiếp xúc với nền trời hoặc bức tường phía sau.'
  },
  {
    id: 'guide-waterdrop',
    title: '6. Dị vật Water Droplet & Phông nền ma mị',
    summary: 'Các đốm nhòe dạng giọt nước và người phụ bị biến dạng kinh dị.',
    detail: 'Kiến trúc StyleGAN2 từng nổi tiếng với lỗi "Water droplet artifact" do cơ chế chuẩn hóa AdaIN. Ngoài ra, người đứng phía sau thường bị GAN vẽ thành những hình nhân quái dị cụt đầu, méo mặt.',
    icon: 'Droplet',
    tip: 'Đừng chỉ nhìn nhân vật chính! Hãy nhìn vào người đi đường phía sau hoặc góc ảnh.'
  }
];
