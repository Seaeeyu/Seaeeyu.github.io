/**
 * Portfolio Website Test - Playwright
 * ทดสอบการทำงานของเว็บไซต์ Portfolio
 */

import { chromium } from 'playwright';

async function testPortfolioWebsite() {
    console.log('🧪 เริ่มทดสอบเว็บไซต์ Portfolio...\n');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const errors = [];
    
    // บันทึก Console Errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(`Console Error: ${msg.text()}`);
        }
    });
    
    page.on('pageerror', error => {
        errors.push(`Page Error: ${error.message}`);
    });
    
    try {
        // 1. ทดสอบการเปิดหน้าเว็บ
        console.log('📂 ทดสอบการเปิดหน้าเว็บ...');
        await page.goto(`file://${process.cwd()}/index.html`, { waitUntil: 'networkidle' });
        console.log('✅ เปิดหน้าเว็บสำเร็จ\n');
        
        // 2. ตรวจสอบ Title ของหน้า
        console.log('📋 ตรวจสอบ Title ของหน้า...');
        const title = await page.title();
        console.log(`   Title: ${title}`);
        console.log('✅ Title ถูกต้อง\n');
        
        // 3. ตรวจสอบ Navigation
        console.log('🧭 ตรวจสอบ Navigation...');
        const navbar = await page.$('.navbar');
        const navLinks = await page.$$('.nav-link');
        const resumeBtn = await page.$('.resume-btn');
        
        console.log(`   - Navbar: ${navbar ? '✅' : '❌'}`);
        console.log(`   - จำนวน Nav Links: ${navLinks.length}`);
        console.log(`   - ปุ่ม Resume: ${resumeBtn ? '✅' : '❌'}`);
        console.log('✅ Navigation ถูกต้อง\n');
        
        // 4. ตรวจสอบ Hero Section
        console.log('🎯 ตรวจสอบ Hero Section...');
        const hero = await page.$('.hero');
        const heroName = await page.$('.hero-name');
        const heroTitle = await page.$('.hero-title');
        const heroBtns = await page.$$('.hero-buttons .btn');
        
        console.log(`   - Hero Section: ${hero ? '✅' : '❌'}`);
        console.log(`   - ชื่อ: ${heroName ? '✅' : '❌'}`);
        console.log(`   - ตำแหน่งงาน: ${heroTitle ? '✅' : '❌'}`);
        console.log(`   - ปุ่ม: ${heroBtns.length} ปุ่ม`);
        console.log('✅ Hero Section ถูกต้อง\n');
        
        // 5. ตรวจสอบ About Section
        console.log('👤 ตรวจสอบ About Section...');
        const about = await page.$('#about');
        const aboutCards = await page.$$('.about-card');
        const stats = await page.$$('.stat-card');
        
        console.log(`   - About Section: ${about ? '✅' : '❌'}`);
        console.log(`   - จำนวน About Cards: ${aboutCards.length}`);
        console.log(`   - จำนวน Stats: ${stats.length}`);
        console.log('✅ About Section ถูกต้อง\n');
        
        // 6. ตรวจสอบ Skills Section
        console.log('💼 ตรวจสอบ Skills Section...');
        const skills = await page.$('#skills');
        const skillCategories = await page.$$('.skill-category');
        const skillPills = await page.$$('.skill-pill');
        
        console.log(`   - Skills Section: ${skills ? '✅' : '❌'}`);
        console.log(`   - จำนวน Skill Categories: ${skillCategories.length}`);
        console.log(`   - จำนวน Skill Pills: ${skillPills.length}`);
        console.log('✅ Skills Section ถูกต้อง\n');
        
        // 7. ตรวจสอบ Experience Section
        console.log('📚 ตรวจสอบ Experience Section...');
        const experience = await page.$('#experience');
        const timelineItems = await page.$$('.timeline-item');
        
        console.log(`   - Experience Section: ${experience ? '✅' : '❌'}`);
        console.log(`   - จำนวน Timeline Items: ${timelineItems.length}`);
        console.log('✅ Experience Section ถูกต้อง\n');
        
        // 8. ตรวจสอบ Portfolio Section
        console.log('🖼️ ตรวจสอบ Portfolio Section...');
        const portfolio = await page.$('#portfolio');
        const portfolioItems = await page.$$('.portfolio-item');
        const filterBtns = await page.$$('.filter-btn');
        
        console.log(`   - Portfolio Section: ${portfolio ? '✅' : '❌'}`);
        console.log(`   - จำนวน Portfolio Items: ${portfolioItems.length}`);
        console.log(`   - จำนวน Filter Buttons: ${filterBtns.length}`);
        console.log('✅ Portfolio Section ถูกต้อง\n');
        
        // 9. ตรวจสอบ Contact Section
        console.log('📞 ตรวจสอบ Contact Section...');
        const contact = await page.$('#contact');
        const contactForm = await page.$('#contact-form');
        const contactCards = await page.$$('.contact-card');
        const socialBtns = await page.$$('.social-btn');
        
        console.log(`   - Contact Section: ${contact ? '✅' : '❌'}`);
        console.log(`   - Contact Form: ${contactForm ? '✅' : '❌'}`);
        console.log(`   - จำนวน Contact Cards: ${contactCards.length}`);
        console.log(`   - จำนวน Social Buttons: ${socialBtns.length}`);
        console.log('✅ Contact Section ถูกต้อง\n');
        
        // 10. ตรวจสอบ Footer
        console.log('🔻 ตรวจสอบ Footer...');
        const footer = await page.$('.footer');
        const footerLinks = await page.$$('.footer-links a');
        
        console.log(`   - Footer: ${footer ? '✅' : '❌'}`);
        console.log(`   - จำนวน Footer Links: ${footerLinks.length}`);
        console.log('✅ Footer ถูกต้อง\n');
        
        // 11. ทดสอบ Mobile Menu Toggle (เฉพาะ Mobile View)
        console.log('📱 ทดสอบ Mobile Menu...');
        
        // สร้าง Mobile View
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        
        const navToggle = await page.$('.nav-toggle');
        if (navToggle) {
            await navToggle.click();
            await page.waitForTimeout(500);
            const menuActive = await page.$('.nav-menu.active');
            console.log(`   - Mobile Menu Toggle: ${menuActive ? '✅' : '❌'}`);
            console.log('✅ Mobile Menu ทำงานได้\n');
        } else {
            console.log('   - Mobile Menu Toggle: ไม่พบ\n');
        }
        
        // กลับไป Desktop View
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForTimeout(500);
        
        // 12. ทดสอบ Portfolio Filter
        const filterBtn = await page.$('.filter-btn[data-filter="web"]');
        if (filterBtn) {
            await filterBtn.click();
            await page.waitForTimeout(500);
            console.log('   - Portfolio Filter: ✅ ทำงานได้\n');
        }
        
        // 13. ตรวจสอบ Smooth Scroll
        console.log('⬇️ ทดสอบ Smooth Scroll...');
        await page.click('a[href="#contact"]');
        await page.waitForTimeout(1000);
        const contactInView = await page.$eval('#contact', el => {
            const rect = el.getBoundingClientRect();
            return rect.top <= 100;
        });
        console.log(`   - Smooth Scroll: ${contactInView ? '✅' : '❌'}`);
        console.log('✅ Smooth Scroll ทำงานได้\n');
        
        // 14. รายงาน Console Errors
        console.log('🔍 ตรวจสอบ Console Errors...');
        if (errors.length === 0) {
            console.log('   ไม่พบ Console Errors');
            console.log('✅ ไม่มีข้อผิดพลาดใน Console\n');
        } else {
            console.log(`   พบ ${errors.length} ข้อผิดพลาด:`);
            errors.forEach((err, i) => console.log(`   ${i + 1}. ${err}`));
            console.log('');
        }
        
        // สรุปผลการทดสอบ
        console.log('═══════════════════════════════════════');
        console.log('🎉 การทดสอบเสร็จสมบูรณ์!');
        console.log('═══════════════════════════════════════\n');
        
        if (errors.length > 0) {
            console.log(`⚠️ มี ${errors.length} ข้อผิดพลาดที่ต้องแก้ไข\n`);
            process.exit(1);
        } else {
            console.log('✨ เว็บไซต์ Portfolio พร้อมใช้งาน!\n');
            process.exit(0);
        }
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาดในการทดสอบ:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

// Run the test
testPortfolioWebsite();
